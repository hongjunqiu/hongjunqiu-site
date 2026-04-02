---
publishDate: 2026-04-02
title: 'OpenClaw Agent 三层并行记忆系统：架构设计与实战'
excerpt: '如何给 AI Agent 搭建一套真正可用的长期记忆系统？三层并行架构——LanceDB-Pro 语义记忆 + SQLite 知识图谱 + 文件系统人工策展，从零到生产的完整方案。'
image: ~/assets/images/default.png
category: tech
tags:
  - AI
  - OpenClaw
  - memory
  - knowledge-graph
  - LanceDB
author: Hongjun
---

LLM Agent 有一个致命缺陷：**没有持久记忆**。每次 session 启动，它都像失忆一样从零开始。

这篇文章分享我在 [OpenClaw](https://github.com/nicepkg/openclaw) 上搭建的三层并行记忆系统——从架构设计到实际部署，包含完整配置、代码和踩坑经验。总成本不到 ¥1/月。

---

## 为什么需要三层记忆

单一记忆方案各有硬伤：

| 方案 | 优势 | 硬伤 |
|------|------|------|
| 向量数据库 | 语义模糊搜索强 | 无法回答"A 和 B 什么关系" |
| 知识图谱 | 精确关系查询 | 无法做自然语言模糊匹配 |
| 文件系统 | 人类可读可编辑 | 无法自动检索，扩展性差 |

三层并行就是取长补短：**语义搜索靠 Layer 1，关系查询靠 Layer 2，人工策展靠 Layer 3**。

> 任何一层单独都不够，三层互补才完整。

---

## 架构总览

系统由三层组成，各自独立运行，通过统一检索入口协同工作：

- **Agent Session 启动** → 自动读取 Layer 3 文件（MEMORY.md 等）
- **收到用户消息** → autoRecall 自动从 Layer 1 语义检索相关记忆
- **需要关系查询** → 调用 Layer 2 知识图谱（graph-query.py）
- **对话结束** → autoCapture 自动捕获新记忆到 Layer 1
- **每日凌晨** → cron 任务执行图谱提取、碎片整理、记忆反思

### 三层定位和分工

| 层级 | 存储 | 写入方式 | 读取方式 | 擅长 |
|------|------|---------|---------|------|
| **Layer 1** LanceDB-Pro | 向量数据库 | autoCapture / memory_store / ruminate | autoRecall / memory_recall | 语义模糊搜索、偏好、事实 |
| **Layer 2** 知识图谱 | SQLite | 每日 cron LLM 提取 | graph-query.py / search.sh | 精确关系查询："谁用了什么" |
| **Layer 3** 文件系统 | Markdown 文件 | Agent 手动写入 | session 启动时读取 / grep | 跨 session 共享、人类可编辑 |

---

## Layer 1 — LanceDB-Pro 实时语义记忆

### 技术栈

| 组件 | 选型 | 说明 |
|------|------|------|
| **向量数据库** | LanceDB (列式存储) | 本地部署，零依赖 |
| **Embedding** | Dashscope `text-embedding-v4` | 1024 维向量 |
| **LLM** | `qwen-turbo-latest` | 用于 autoCapture 和 ruminate |
| **检索策略** | Hybrid: 向量 0.7 + BM25 0.3 | 语义 + 关键词，兼顾精度和召回 |

### 写入链路

有三条路径写入 Layer 1：

#### autoCapture — 自动捕获

每轮对话结束后，插件自动分析对话内容，提取值得保存的信息。无需 Agent 干预。

适合捕获：用户偏好、事实陈述、技术决策等。

#### memory_store — Agent 主动存储

Agent 识别到重要信息时，主动调用 `memory_store` 工具：

```json
{
  "text": "Hongjun 偏好：问信息类问题时只回答不动手",
  "category": "preference",
  "importance": 0.8
}
```

适合：明确的偏好声明、重要决策、需要精确保存的信息。

#### ruminate — 定时反思

每天凌晨 03:30，反思引擎扫描近期记忆，将零散信息整合为 pattern：

> 多条零散记忆："用户喜欢简洁回答" + "用户不喜欢太正式" + "用户喜欢幽默"
> → pattern: "回复风格偏好：简洁、幽默、非正式"

### 读取链路

**autoRecall — 自动检索注入：** 收到用户消息时，插件自动语义检索并注入上下文。Agent 不需要做任何事。

**memory_recall — 手动搜索：** autoRecall 没命中时，Agent 主动调用搜索特定类别。

### 记忆分类

| 类型 | 说明 | 典型内容 |
|------|------|---------|
| `preference` | 用户偏好 | "回答风格：简洁幽默" |
| `fact` | 事实信息 | "时区是 GMT+8" |
| `decision` | 决策记录 | "播客用 Cherry+Bunny 双女声" |
| `entity` | 实体信息 | "Mac mini 是主要开发机" |
| `reflection` | 反思总结 | ruminate 生成的 pattern |
| `cases` | 案例记录 | 问题解决过程 |
| `patterns` | 行为模式 | 从多次交互中归纳的规律 |

### 生命周期管理：Weibull 衰减

记忆不是永久的。Layer 1 用 **Weibull 衰减模型** 管理记忆生命周期：

```
存活概率 P(t) = exp(-(t/λ)^k)

  t = 距上次访问的时间
  λ = 尺度参数（控制衰减速度）
  k = 形状参数（>1 表示老化加速）
```

关键机制：

- **自然衰减** — 长时间不被检索的记忆，权重逐渐降低
- **检索强化** — 每次被命中，重置衰减计时器（`reinforcementFactor: 0.5`）
- **噪音过滤** — importance 低于阈值的在 compaction 时清理
- **碎片整理** — 每日 03:15 执行 compaction

> 这模拟了人类记忆的规律：常用的记得住，不用的慢慢忘。

### 配置示例

```json
{
  "plugins": {
    "memory-lancedb-pro": {
      "enabled": true,
      "config": {
        "storage": {
          "path": "~/.openclaw/memory/lancedb-pro"
        },
        "embedding": {
          "provider": "dashscope",
          "model": "text-embedding-v4",
          "dimensions": 1024,
          "apiKey": "${DASHSCOPE_API_KEY}"
        },
        "llm": {
          "provider": "dashscope",
          "model": "qwen-turbo-latest",
          "apiKey": "${DASHSCOPE_API_KEY}"
        },
        "retrieval": {
          "hybrid": true,
          "vectorWeight": 0.7,
          "bm25Weight": 0.3,
          "topK": 10
        },
        "autoCapture": true,
        "autoRecall": true,
        "decay": {
          "model": "weibull",
          "reinforcementFactor": 0.5
        }
      }
    }
  }
}
```

### 💰 成本估算

| 项目 | 单价 | 月用量 | 月成本 |
|------|------|--------|--------|
| Embedding (text-embedding-v4) | ¥0.0007/千 token | ~60K token | ¥0.04 |
| LLM autoCapture | ¥0.003/千 token | ~200K token | ¥0.60 |
| LLM ruminate | ¥0.003/千 token | ~20K token | ¥0.06 |
| 存储 | 本地磁盘 | — | ¥0 |
| **合计** | | | **约 ¥0.70/月** |

---

## Layer 2 — 知识图谱结构化关系记忆

### 技术栈

| 组件 | 选型 | 说明 |
|------|------|------|
| **存储** | SQLite (WAL 模式) | 单文件，零运维 |
| **提取 LLM** | `qwen-turbo-latest` | temperature=0.1 |
| **查询工具** | `graph-query.py` | CLI 查询 |

### 数据模型

两张表，简单清晰：

```sql
-- 实体表
CREATE TABLE entities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    props TEXT DEFAULT '{}',
    created_at REAL NOT NULL,
    updated_at REAL NOT NULL
);

-- 关系表
CREATE TABLE relations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src_name TEXT NOT NULL,
    relation TEXT NOT NULL,
    dst_name TEXT NOT NULL,
    props TEXT DEFAULT '{}',
    created_at REAL NOT NULL,
    UNIQUE(src_name, relation, dst_name)
);
```

### 实体和关系类型

**8 种实体类型：** person、project、tool、server、channel、organization、concept、event

**12 种关系类型：** uses、manages、member_of、depends_on、runs_on、deployed_to、created_by、knows、partner_of、config_of、scheduled_at、located_in

### LLM 提取 Prompt 设计

提取质量的核心在于 Prompt，遵循五个原则：

1. **两阶段提取** — 先识别实体（NER），再提取关系（RE）
2. **限定类型** — 枚举允许的实体和关系类型，不让 LLM 自由发挥
3. **Few-shot 示例** — 给出标准输入输出示例，稳定输出格式
4. **JSON 强制** — `response_format: json_object`，避免解析失败
5. **去重指引** — 明确要求合并同一实体的不同称呼

提取 Prompt 示例：

```
你是一个知识图谱提取助手。从文本中提取实体和关系。

## 规则
1. 只提取以下类型的实体：person, project, tool, server, channel,
   organization, concept, event
2. 只提取以下类型的关系：uses, manages, member_of, depends_on,
   runs_on, deployed_to, created_by, knows, partner_of, config_of,
   scheduled_at, located_in
3. 实体名称要规范化（统一用最常见的称呼，同一实体不同称呼要合并）
4. 每个关系必须有 source、relation、target
5. 只提取文本中明确提到的事实，不要推测

## 示例
输入："Hongjun 让 Clawra 在 Mac mini 上配置了 Discord bot。"
输出：
{
  "entities": [
    {"name": "Hongjun", "type": "person"},
    {"name": "Clawra", "type": "person"},
    {"name": "Mac mini", "type": "server"},
    {"name": "Discord", "type": "tool"}
  ],
  "relations": [
    {"source": "Clawra", "relation": "runs_on", "target": "Mac mini"},
    {"source": "Clawra", "relation": "uses", "target": "Discord"},
    {"source": "Hongjun", "relation": "manages", "target": "Clawra"}
  ]
}
```

### 提取流程

每日凌晨 03:05 通过 cron 执行。文本超过 4000 字符时按 3500 字符切分（500 字符重叠），避免截断关系。

### 查询示例

```bash
# 查询某个实体的所有关系
python3 graph-query.py --entity "Hongjun"
# → Hongjun --manages--> Clawra
# → Hongjun --partner_of--> 黄琴
# → Hongjun --uses--> OpenClaw

# 列出某类型的所有实体
python3 graph-query.py --type "tool"

# 列出某类关系
python3 graph-query.py --relation "runs_on"

# 查看统计
python3 graph-query.py --stats
# → Entities: 90, Relations: 73
```

### 去重和清理

- **实体去重** — `name` UNIQUE 约束，已存在时自动 merge props
- **关系去重** — 三元组 UNIQUE，重复插入静默忽略
- **实体合并** — `merge_entity(old_name, new_name)` 迁移关系并删除旧实体
- **定期清理** — cron 中执行 prune，清除无关系的孤立实体

---

## Layer 3 — 文件系统人工策展记忆

### 文件结构

```
~/.openclaw/workspace/
├── MEMORY.md           # 长期记忆索引层（核心）
├── SOUL.md             # Agent 人格定义
├── USER.md             # 用户信息
├── AGENTS.md           # 行为规范 + Memory Protocol
├── TOOLS.md            # 工具配置笔记
└── memory/
    ├── 2026-04-01.md   # 每日笔记
    ├── 2026-04-02.md
    └── ...             # 专题文档
```

### MEMORY.md 精简原则

MEMORY.md 是**索引层**，不是存储层：

| ✅ 放进 MEMORY.md | ❌ 不放进 MEMORY.md |
|---|---|
| 安全红线（不可删除） | 一次性的调试记录 |
| 核心人物和联系方式 | 已被 LanceDB autoCapture 的偏好 |
| 关键配置（Channel ID 等） | 已在知识图谱中的关系 |
| 当前活跃项目的关键决策 | 过时的历史信息 |
| 重要教训（速查） | 详细的操作步骤 |

> **控制在 5000 字符以内。** 每个 session 启动都要读取这个文件，太长会浪费 token。

### Memory Protocol

**写入时机：**

| 触发条件 | 动作 |
|---------|------|
| 学到重要信息 | `memory_store` 存到 Layer 1 |
| 被纠正错误 | 更新 MEMORY.md 加为规则 |
| 做出重要决策 | 写到 MEMORY.md |
| session 快结束 | 总结到 `memory/YYYY-MM-DD.md` |

**读取时机：**

| 触发条件 | 动作 |
|---------|------|
| 回答历史问题前 | 先 `memory_recall` 搜索 |
| 开始新任务前 | 检查当天每日笔记 |
| session 启动 | 读 MEMORY.md + SOUL.md + USER.md |

### 与 Layer 1/2 的去重策略

- Layer 1 覆盖的信息不重复写入 MEMORY.md
- Layer 2 覆盖的关系不重复写入 MEMORY.md
- MEMORY.md 只保留必须在 session 启动时立即可见的内容
- 每日笔记作为 Layer 1/2 的原始输入源

---

## 统一检索架构

### 检索优先级

| 优先级 | 层 | 方式 | 说明 |
|--------|---|------|------|
| Tier 1 | 知识图谱 | 精确关系查询 | 命中即停 |
| Tier 2 | LanceDB | 语义向量搜索 | memory_recall 工具 |
| Tier 3 | grep | 文件关键词匹配 | 兜底 |
| Tier 4 | web_search | 联网搜索 | 最后手段 |

### Decision Tree

不是所有问题都需要搜索记忆：

- **闲聊/简单问题** → 直接回答
- **历史工作/项目/人物** → 先 memory_recall
- **需要精确关系**（"谁管理谁"）→ 图谱优先
- **需要深度搜索** → 三级全搜

### autoRecall vs 手动搜索

| | autoRecall | 手动 memory_recall |
|---|---|---|
| **触发** | 每条消息自动 | Agent 主动调用 |
| **查询** | 用户消息原文 | Agent 构造的查询词 |
| **适合** | 大多数场景 | 需要精确搜索特定类别 |
| **成本** | 每条消息一次 Embedding | 按需 |

---

## 定时维护 Pipeline

### 每日凌晨任务表

| 时间 | 任务 | 说明 |
|------|------|------|
| **03:05** | 知识图谱提取 | 从当天 memory 文件提取实体和关系 |
| **03:15** | LanceDB 碎片整理 | compaction + 清理低权重过期记忆 |
| **03:30** | 记忆反思 | ruminate：零散记忆 → pattern |

**03:05 知识图谱提取** — 读取当天的每日笔记，用 LLM 提取实体和关系写入 graph.db。

**03:15 碎片整理** — 合并增量写入碎片，清理 Weibull 衰减后权重过低的记忆。

**03:30 记忆反思** — 扫描近期记忆，识别模式并生成 reflection 类型记忆。例：3 条关于用户不喜欢正式语气的记忆 → 1 条 pattern："用户偏好非正式、幽默的回复风格"。

---

## 实战案例

### 案例 1：跨 session 信息同步

**背景：** 同时在 Discord 和 webchat 两个 session 工作。在 webchat 中把 TTS 声音从"龙安洋（男声）"改成了"Cherry + Bunny（双女声）"。

**问题：** Discord session 完全不知道这个变更，还在用旧方案生成音频。

**解决：**
1. 做出决策后立即写入 MEMORY.md
2. 同时用 `memory_store` 存入 LanceDB（category: decision）
3. 所有 session 启动时读取 MEMORY.md，立刻获得最新决策
4. autoRecall 也会在讨论播客时自动检索到这条 decision

> **教训：** 做出重要决策时，必须写到 MEMORY.md。Layer 1 是辅助保险，Layer 3 才是跨 session 同步的可靠保证。

---

### 案例 2：记忆的完整生命周期

**第一天 — 存储：** 用户说"以后问信息类问题只回答不动手"。Agent 调用 `memory_store`，text 经 Embedding 写入 LanceDB。

**第三天 — 检索：** 用户问"帮我查下 NVDA 股价"。autoRecall 命中偏好记忆，Agent 只回答信息，不执行操作。

**第三十天 — 衰减和强化：** 这条偏好被命中了 15 次，每次都触发检索强化，存活概率仍然很高。而同期另一条从未被检索的记忆，Weibull 存活概率已降到很低。

> **这就是"用进废退"** — 像人类记忆一样，常用的记得住，不用的自然忘掉。

---

### 案例 3：三层分别命中

**查询 1："Hongjun 管理谁？"**

→ **Layer 2 精确命中。** 知识图谱直接返回关系，向量搜索无法直接回答。

**查询 2："播客用什么声音？"**

→ **Layer 1 语义命中。** "声音"和"Cherry/Bunny"之间没有图谱关系，但语义相似度很高。

**查询 3："#tech-news 的 Channel ID？"**

→ **Layer 3 grep 命中。** Channel ID 是固定配置，写在 MEMORY.md 里最合适。

> 每层有自己擅长的查询类型。关系用图谱、语义用向量、配置用文件。这就是三层并行的意义。

---

## 从零搭建指南

### Step 1：安装 LanceDB-Pro 插件

```bash
openclaw plugin install memory-lancedb-pro
openclaw plugin list | grep lancedb
```

### Step 2：配置 Embedding 和 LLM

编辑 `openclaw.json`，添加 memory-lancedb-pro 配置（参考上文配置示例）。关键项：

```json
{
  "embedding.provider": "dashscope",
  "embedding.model": "text-embedding-v4",
  "embedding.dimensions": 1024,
  "llm.model": "qwen-turbo-latest",
  "autoCapture": true,
  "autoRecall": true
}
```

重启后发送测试消息，检查日志中是否有 autoCapture/autoRecall 输出。

### Step 3：创建定时任务

```bash
openclaw cron add --name "lancedb-compact" \
  --schedule "15 3 * * *" \
  --task "memory-lancedb-pro compact"

openclaw cron add --name "lancedb-ruminate" \
  --schedule "30 3 * * *" \
  --task "memory-lancedb-pro ruminate"
```

### Step 4：搭建知识图谱

```bash
mkdir -p ~/.openclaw/workspace/scripts/knowledge-graph

# 部署脚本：graph.py / graph-extract.py / graph-query.py
# 首次提取
python3 graph-extract.py ~/.openclaw/workspace/memory/*.md
python3 graph-query.py --stats
```

### Step 5：设置图谱 cron

```bash
openclaw cron add --name "kg-extract" \
  --schedule "5 3 * * *" \
  --command "python3 graph-extract.py \
    ~/.openclaw/workspace/memory/\$(date +%Y-%m-%d).md"
```

### Step 6：优化 MEMORY.md

1. 将已被 Layer 1/2 覆盖的信息移除
2. 保留：安全红线、关键配置、活跃决策、速查教训
3. 控制在 5000 字符以内
4. 在 AGENTS.md 中添加 Memory Protocol

---

## 未来优化方向

### 图谱实时化

当前每日批量提取有 24 小时延迟。可在 autoCapture 链路中同步触发图谱提取，实现增量更新。

### 记忆可视化

用 D3.js / Cytoscape.js 做图谱可视化 Web 页面，展示实体关系网络和记忆衰减曲线。

### 跨 Agent 记忆共享

多个 Agent 间共享 Layer 2 知识图谱（项目事实），Layer 1 按 scope 隔离（个人偏好）。

### 记忆冲突检测

检测同一主题的矛盾记忆，自动标记冲突，按时间戳和 importance 选择优先级。

### 记忆压缩与摘要

对旧记忆做摘要压缩，分级存储：热记忆（向量）→ 温记忆（摘要）→ 冷记忆（归档）。

---

## 附录：方案对比

| 方案 | 优势 | 不适合的原因 |
|------|------|-------------|
| **Cognee** | Docker 部署，自动索引，93% 准确率 | 太重，需要 Docker |
| **Graphiti (Zep)** | 双时间戳，事件追踪 | 功能强但复杂过度 |
| **mem0** | Extract→Resolve 两步，向量存储 | 不支持关系查询 |
| **自建 SQLite + LanceDB** | 轻量可控，零依赖 | ✅ **最适合个人 Agent** |

最终选择自建方案，核心理由：**轻量、可控、成本低（<¥1/月）、不依赖外部服务**。

---

*本文基于 OpenClaw 实际部署经验编写。如有问题，欢迎讨论。*

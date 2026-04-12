---
publishDate: 2026-04-12
title: '每日科技播客 2026-04-12'
excerpt: '今日看点：Brila | Velo | Offsite'
audio: /audio/podcast/2026-04-12.mp3
audioDuration: 480
category: podcast
tags:
  - podcast
  - tech-daily
author: AI Hosts
---

<blockquote style="font-size: 0.875rem; line-height: 1.5; border-left: 3px solid #6366f1; padding: 0.5rem 1rem; margin: 1rem 0; background: #f8fafc;">
📌 <strong>今日看点</strong>：Brila | Velo | Offsite | Filing the corners off my MacBooks | CPU-Z 和 HWMonitor 被入侵
</blockquote>


---

## 今日科技要闻

### 🚀 Product Hunt 本月热门产品

- **Brila** — 从 Google Maps 真实评价一键生成单页网站
- **Velo** — 把任何内容变成视频消息分享
- **Offsite** — 构建人类+AI Agent 混合团队，实时观察协作

### 🧡 Hacker News 热帖

- **Filing the corners off my MacBooks** — 一位用户分享了给 MacBook 打磨圆角的改造过程，引发 383 条评论热议
- **CPU-Z 和 HWMonitor 被入侵** — 知名硬件检测工具供应链遭攻击，321 赞
- **AI assistance when contributing to the Linux kernel** — Linux 内核贡献中使用 AI 辅助的讨论，310 赞 204 评论

### 💻 GitHub Trending

- **HKUDS/OpenSpace** — 让你的 AI Agent 更聪明、低成本、自进化的开源框架
- **alvinreal/awesome-opensource-ai** — 精选最佳开源 AI 项目列表，涵盖 2026 最新模型
- **Netflix/void-model** — Netflix 开源 VOID 视频编辑模型，可智能擦除视频中的物体并模拟物理效果

### 📝 AI 本周重磅（AI Week in Review）

- **Claude Mythos Preview** — Anthropic 发布"最强"前沿模型，编码能力 SWE-Bench Pro 达 77.8%，网络安全能力突出到不敢公开发布
- **Meta Muse Spark** — Meta 超级智能实验室首款多模态推理模型，支持工具调用和多 Agent 协作
- **Z.ai GLM-5.1 开源** — 754B MoE 模型，开源模型 SWE-Bench Pro 第一（58.4%），完全在华为昇腾硬件上训练

### 💡 开发者圈热点

- **Karpathy: 开发者患上了"AI 精神病"** — AI 对开发者的冲击最先到来，但其他行业也将跟上
- **r/programming 临时禁止 LLM 帖子** — 690 万成员的最大编程社区宣布 4 月份暂禁所有 LLM 相关帖子
- **Anthropic 发布 Claude Managed Agents** — 云端托管长期运行 Agent 的可组合 API 平台

### 📰 The Verge 科技新闻

- **Raspberry Pi 涨价** — 受 AI 带动的内存/存储价格暴涨影响，Raspberry Pi 宣布提价
- **Elgato Stream Deck 支持 AI 按键** — AI 可通过 MCP hooks 控制 Stream Deck 按钮，同时推出趣味老虎机插件
- **Penguin 起诉 OpenAI 版权侵权** — ChatGPT 生成了与德国儿童书几乎一模一样的内容，出版商在慕尼黑提起诉讼

### 📱 TechCrunch 科技新闻

- **YouTube Premium 和 Music 涨价** — YouTube 确认在美国提高订阅价格
- **SiFive 获 4 亿美元融资，估值 36.5 亿** — Nvidia 支持的 RISC-V 芯片公司估值再创新高
- **电池回收商 Ascend Elements 申请破产** — 曾融资近 9 亿美元的电池回收明星企业倒下

---

<details>
<summary>📝 完整对话文字版（点击展开）</summary>

**芊悦**：嘿！大家好，欢迎收听《科技早知道》，我是芊悦～今天是4月12号，周日。

**萌萌**：我是萌萌！今天有条消息我必须先剧透——Anthropic 发了个叫 Claude Mythos 的模型，强到他们自己都不敢公开发布？这什么操作！

**芊悦**：哈哈别急，这条确实炸，咱们待会儿好好聊。先说个让我有点五味杂陈的事——r/programming 那个六百九十万人的社区，四月份直接禁了所有 LLM 相关帖子。

**萌萌**：等等，真的假的？最大的编程社区禁 AI 帖子？这就好比一个美食论坛说"本月禁止讨论外卖"一样离谱吧。

**芊悦**：你这比喻还挺精准的。但我觉得他们有他们的道理啊，你想想看，现在打开任何一个技术论坛，十条帖子八条在聊 AI，剩下两条评论区也在吵 AI。

**萌萌**：嗯...我能理解信息过载的问题，但我不太同意这种一刀切的做法。你禁了帖子，不代表开发者就不焦虑了啊。

**芊悦**：这倒是。Karpathy 说的那个"AI 精神病"也是类似的意思——开发者现在天天被 AI 冲击，整个行业都有点应激了。

**萌萌**：我觉得吧，Karpathy 说得更狠，他说开发者只是第一波，其他行业也会跟上。这就像地震，程序员是震中，但余波会扩散到所有人。

**芊悦**：所以你是觉得禁帖子反而是一种逃避？

**萌萌**：对！你越回避，焦虑越大。不如正面刚，建设性地讨论怎么适应。

**芊悦**：话是这么说啦但是，社区管理者要维护讨论质量啊。你要是每天看到一百条"AI 会不会取代程序员"，你也烦。

**萌萌**：好吧好吧，各有各的难处。那咱们聊今天真正的重磅——Claude Mythos！

**芊悦**：Anthropic 这次发的是 Mythos Preview，SWE-Bench Pro 直接到了 77.8%。你知道这意味着什么吗？这东西写代码基本上快比大部分初级程序员靠谱了。

**萌萌**：我天，77.8%！但你说他们网络安全能力强到不敢公开？这是什么意思，怕被人拿去搞事情？

**芊悦**：对，就是这个顾虑。模型太懂安全攻防了，公开之后可能被滥用。所以他们选择了限制访问。

**萌萌**：嗯...怎么说呢，这让我想到核技术——你造出来了，但你不敢随便给人用。AI 已经到了这个阶段了吗？

**芊悦**：这个类比有点夸张了吧。不过确实，负责任地发布模型越来越成为一个真实的问题了。

**萌萌**：而且你注意到没？同一周 Anthropic 还发了 Managed Agents，云端托管长期运行的 Agent。这公司是要把整条链路都吃下来啊。

**芊悦**：没错。模型层有 Mythos，应用层有 Managed Agents，他们的策略越来越清晰了。

**萌萌**：哎说到这个，Meta 也没闲着啊！Muse Spark 你看了吗？

**芊悦**：看了。Meta 那个超级智能实验室出的多模态推理模型，支持工具调用和多 Agent 协作。但说实话，我对 Meta 的 AI 产品一直有点...保留态度。

**萌萌**：笑死，你这个"保留态度"说得好委婉。你就直说你觉得 Meta 发了一堆模型但没几个真正爆火的产品对吧？

**芊悦**：被你看穿了。但公平地说，Meta 在开源方面的贡献还是很大的。

**萌萌**：确实。而且说到开源，Z.ai 的 GLM-5.1 也必须聊——754B 的 MoE 模型，完全用华为昇腾训练，开源 SWE-Bench Pro 第一名！

**芊悦**：58.4% 的分数，在开源领域这是断档领先了。而且重点是用昇腾训练的，不用英伟达的芯片也能做到这个水平。

**萌萌**：你说这是不是说明，芯片封锁没有那么可怕？

**芊悦**：我不太同意这么乐观的判断。58.4% 和 Claude Mythos 的 77.8% 还是有差距的。而且训练效率、成本这些没公开，不能只看最终分数。

**萌萌**：有道理。不过至少证明了这条路是走得通的，这本身就很重要。

**芊悦**：嗯，这一点我同意。好了，快速过几条其他新闻——Netflix 开源了一个叫 VOID 的视频编辑模型，可以智能擦除视频里的物体，还能模拟物理效果。

**萌萌**：就好比视频版的 Photoshop 橡皮擦，但它还会自动脑补被擦掉的地方应该是什么样子。这对视频后期来说简直是神器。

**芊悦**：GitHub Trending 上还有个 OpenSpace 框架，让 AI Agent 更聪明、低成本、自进化。感觉今年 Agent 真的是主旋律了。

**萌萌**：对了，你看到 CPU-Z 和 HWMonitor 被入侵的事了吗？供应链攻击啊！

**芊悦**：看到了，三百多赞，大家都很关注。这种用了好多年的老牌工具被攻击，说明供应链安全怎么重视都不为过。

**萌萌**：还有一条挺有趣的——有人给自己的 MacBook 打磨圆角。

**芊悦**：哈哈哈哈，这三百八十多条评论的热度也是没想到。极客精神嘛，不满意就自己动手。

**萌萌**：Raspberry Pi 也涨价了，因为 AI 带动的内存和存储价格暴涨。这下连树莓派都不便宜了。

**芊悦**：还有 YouTube Premium 也涨价。最近涨价的东西也太多了吧。

**萌萌**：离谱。哎还有个有意思的——Penguin 出版社起诉 OpenAI，因为 ChatGPT 生成了和德国儿童书几乎一模一样的内容。

**芊悦**：版权问题越来越多了。训练数据的合规性，这个坑只会越来越大。

**萌萌**：Elgato Stream Deck 那个支持 AI 按键的也蛮好玩的，通过 MCP hooks 控制按钮。以后主播一键呼叫 AI 助手？

**芊悦**：Product Hunt 上也有些有意思的产品——Brila 从 Google Maps 评价一键生成网站，Offsite 做人类和 AI Agent 的混合团队。

**萌萌**：SiFive 拿了 4 亿美元融资，估值 36.5 亿，Nvidia 投的。RISC-V 芯片赛道确实火。

**芊悦**：还有 Ascend Elements 破产了，之前融了快 9 亿美元的电池回收公司。新能源产业链也不是稳赚不赔的。

**萌萌**：我天，9 亿美元都能倒？这钱是烧在哪了。

**芊悦**：好啦，今天的科技早知道就到这里～今天最大的感受是，AI 模型军备竞赛在加速，但围绕它的焦虑、版权和安全问题也在同步升级，技术和社会需要一起往前走。

**萌萌**：说得好！大家别忘了关注我们，每天 5 分钟，掌握科技圈大小事！我们明天见～

</details>

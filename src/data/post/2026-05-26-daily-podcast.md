---
publishDate: 2026-05-26
title: '每日科技播客 2026-05-26'
excerpt: '今日看点：Unabyss | own. | Yansu'
audio: /audio/podcast/2026-05-26.mp3
audioDuration: 480
category: podcast
tags:
  - podcast
  - tech-daily
author: AI Hosts
---

<blockquote style="font-size: 0.875rem; line-height: 1.5; border-left: 3px solid #6366f1; padding: 0.5rem 1rem; margin: 1rem 0; background: #f8fafc;">
📌 <strong>今日看点</strong>：Unabyss | own. | Yansu | Exit IP VPN servers mitigation rollout | Norway's 2 petabytes of Huawei flash storage and LLM training
</blockquote>


---

## 今日科技要闻

### 🚀 Product Hunt 热门产品

- **Unabyss** — MCP 原生的自更新上下文层，为你的 AI 提供持续记忆 [链接](https://www.producthunt.com/)
- **own.** — 个人数据所有权工具，让你真正拥有自己的数据 [链接](https://www.producthunt.com/)
- **Yansu** — AI 学习你的工作方式并将其转化为自动化流程 [链接](https://www.producthunt.com/)

### 🔥 Hacker News 热帖

- **Exit IP VPN servers mitigation rollout** — Mullvad VPN 推出出口 IP 服务器缓解措施，提升隐私保护 [链接](https://mullvad.net)
- **Norway's 2 petabytes of Huawei flash storage and LLM training** — 挪威使用华为 2PB 闪存进行大模型训练引发关注 [链接](https://blocksandfiles.com)
- **GTA VI 正式发售日：2026年5月26日** — 万众期待的 GTA6 今日正式发售！ [链接](https://news.ycombinator.com/item?id=43870844)

### 📄 Hugging Face 热门论文

- **SkillOpt: Executive Strategy for Self-Evolving Agent Skills** — 提出自进化 Agent 技能的执行策略优化框架 [链接](https://huggingface.co/papers)
- **Rethinking Cross-Layer Information Routing in Diffusion Transformers** — 重新思考扩散 Transformer 中的跨层信息路由机制 [链接](https://huggingface.co/papers)
- **Lens: Rethinking Training for Diffusion Models** — 提出新的扩散模型训练范式 Lens [链接](https://huggingface.co/papers)

### 💻 Dev.to 热门文章

- **The Most Concerning AI Risk of 2026** — 7000+ 开发者在 State of Web Dev AI 调查中分享了对 AI 风险的看法 [链接](https://dev.to/sachagreif/the-most-concerning-ai-risk-of-2026-3m0d)
- **AI Weekly: Google Reshapes the Coding Stack, Claude Pulls Ahead** — Google 重塑编码技术栈，Claude 在 Agent 协议层领先（5月13-20日周报） [链接](https://dev.to/t/news)
- **Top 5 Local LLM Tools and Models in 2026** — 2026 年最佳本地大模型工具和模型推荐 [链接](https://dev.to/top/year)

### 💬 Reddit r/programming 热帖

- **Flipper One – we need your help** — Flipper 团队发布新硬件 Flipper One，寻求社区反馈 [链接](https://flipper.net)
- **Google I/O 2026 开发者大会回顾** — 社区讨论 Google I/O 发布的 Android 和 AI 新功能 [链接](https://www.reddit.com/r/programming/)
- **We're testing new ad formats in Search** — Google 在搜索中测试新广告格式引发开发者热议 [链接](https://www.reddit.com/r/programming/)

### 📰 The Verge 科技新闻

- **白宫要求 90 亿美元为情报机构购买 AI 芯片** — 纽约时报报道 CIA 和 NSA 缺乏运行最新 AI 模型的算力 [链接](https://www.theverge.com/)
- **教皇利奥呼吁在 AI 时代保持"深刻的人性"** — 新任教皇在首份重要文件中警告 AI 和不受约束的技术力量风险 [链接](https://www.theverge.com/news/936945/pope-leo-letter-encyclical-ai-anthropic-labor-warfare)
- **Google I/O 2026 全程回顾** — The Verge 现场报道 Google I/O 2026 主题演讲精华 [链接](https://www.theverge.com/tech/932275/google-io-2026-live-blog-on-the-ground-at-googles-keynote)

### 🦄 TechCrunch 科技新闻

- **核能创业公司 Deep Fission 宣布上市** — 计划 IPO 融资 1.57 亿美元，投资者对其核能故事存疑 [链接](https://techcrunch.com/2026/05/23/nuclear-startup-deep-fission-says-its-going-public-again-and-i-have-questions/)
- **Google 迪斯科风格图标引争议** — Google 用闪闪发光的迪斯科球图标替换经典设计 [链接](https://techcrunch.com/latest/page/2/)
- **VC 和创始人如何用虚高 ARR 打造 AI 独角兽** — 揭露 AI 公司估值泡沫中的数据注水现象 [链接](https://techcrunch.com/latest/page/2/)

---

<details>
<summary>📝 完整对话文字版（点击展开）</summary>

**芊悦**：嘿大家好！欢迎收听《科技早知道》，我是芊悦～今天是5月26号，周二。

**萌萌**：我是萌萌！天哪今天我必须先说一件事——GTA6 今天正式发售了！！我已经看到朋友圈被刷屏了。

**芊悦**：哈哈哈我就知道你第一个要说这个。不过今天除了 GTA6，还有个挺有意思的——挪威居然用华为的 2PB 闪存训练大模型，这个我们待会儿好好聊聊。

**萌萌**：好好好，那我们先从 GTA6 开始吧，毕竟这可是等了多少年的事儿啊！

**芊悦**：说真的，从 GTA5 到现在差不多十三年了。Rockstar 这波饥饿营销玩到极致了，预告片出来的时候全网都疯了，现在终于能玩到了。

**萌萌**：十三年！我上小学的时候 GTA5 就出了好吧。你说这游戏能不能超越前作啊？我看预告片里那个迈阿密风的城市，细节简直离谱。

**芊悦**：我觉得从技术层面肯定是碾压的，但你知道吗，我反而有点担心。现在游戏行业这个氛围，微交易、在线模式疯狂氪金——GTA Online 当年可是印钞机啊。

**萌萌**：你这么一说我也慌了。不过话说回来，单机剧情只要够硬，我觉得玩家还是会买单的。毕竟 Rockstar 的叙事能力摆在那儿。

**芊悦**：嗯确实。而且这次双主角设定，一男一女，我还蛮期待女性视角在犯罪题材里怎么展开的。

**萌萌**：对对对！终于不是只有糙汉子了。哎说到这个，我不太同意网上说"女主角是为了政治正确"的论调，好的故事本来就需要多元视角嘛。

**芊悦**：同意。好了 GTA 聊到这儿，咱们说说今天另一个重磅——挪威用华为 2PB 闪存做大模型训练这事儿。

**萌萌**：等等，挪威？用华为？这不是在各种制裁风口浪尖上吗？

**芊悦**：对啊，所以这事儿才引发这么大关注。挪威不是欧盟成员国但是北约成员，他们选华为的存储方案，说明在性价比和技术指标上华为确实有竞争力。

**萌萌**：2PB 是什么概念啊？我脑子转不过来。

**芊悦**：2000个TB，大概相当于——你知道 Netflix 上所有电影加起来大概也就几百 PB，2PB 单独拿来做模型训练的存储，这个规模相当可以了。

**萌萌**：哇塞。但是我有个疑问，用华为的存储硬件训练 LLM，这跟用英伟达的 GPU 训练有什么区别？存储不就是存数据的吗？

**芊悦**：好问题。训练大模型不光需要算力，数据的读写速度也是瓶颈。你可以理解为——GPU 是大厨，闪存是食材供应链。大厨再牛，食材供不上来也白搭。高速闪存能让数据喂给 GPU 的速度跟上，不让算力空转。

**萌萌**：哦这个比喻我懂了！就像外卖平台，骑手再多，商家出餐慢也没用。

**芊悦**：哈哈对，差不多这意思。所以挪威这个选择其实是很务实的技术决策，虽然政治上确实敏感。

**萌萌**：我觉得吧，技术归技术，安全归安全，但如果一刀切什么都不让用，最后吃亏的是自己的研发进度。

**芊悦**：嗯...怎么说呢，我不完全同意。基础设施层面的供应商选择确实要考虑长期风险，万一哪天政策变了，维护和升级怎么办？不是说华为不好，而是要有 plan B。

**萌萌**：好吧，你说的也有道理。地缘政治这东西谁说得准呢。

**芊悦**：对了，说到 AI 相关的，今天白宫要求 90 亿美元给情报机构买 AI 芯片，说 CIA 和 NSA 缺算力跑不动最新的模型。

**萌萌**：不是吧！美国情报机构居然也缺算力？我以为他们要什么有什么呢。

**芊悦**：哈哈你以为电影里演的呢。现实是政府采购流程极其缓慢，等批下来硬件都过时两代了。90 亿美元，这可不是小数目。

**萌萌**：这就像——你家网速还是 4G，邻居都用上 6G 了，然后你跟房东说我要升级，房东说"走流程"。

**芊悦**：笑死，差不多就这意思。好了我们快速过几条——

**萌萌**：来来来，快讯时间！

**芊悦**：Product Hunt 今天有个挺有意思的产品叫 Unabyss，做 MCP 原生的自更新上下文层，给 AI 提供持续记忆。这个方向我觉得很对，现在 AI 最大的痛点之一就是没有长期记忆。

**萌萌**：对！每次跟 AI 聊天都要重新自我介绍，烦死了。还有个叫 own 的，做个人数据所有权，让你真正拥有自己的数据——这个概念喊了好多年了，希望这次能落地。

**芊悦**：GitHub trending 上 Anthropic 出了个官方知识工作插件集合，15000 多 star 了。还有个 Understand-Anything 通用理解框架，30000 star，多模态内容分析的。

**萌萌**：Anthropic 最近动作好多啊。哎对了，Dev.to 上有篇文章说 Claude 在 Agent 协议层领先 Google，你怎么看？

**芊悦**：我觉得吧，现在说谁领先还为时过早，这个赛道才刚开始。不过 Claude 在工具调用和长上下文方面确实做得不错，MCP 协议推广得也快。

**萌萌**：嗯嗯。还有个有意思的——新教皇利奥呼吁在 AI 时代保持"深刻的人性"，警告不受约束的技术力量风险。

**芊悦**：教皇都来聊 AI 了，说明这事儿真的进入主流公共话语了。不管你信不信教，"保持人性"这个提醒在技术狂奔的时代确实重要。

**萌萌**：确实。虽然我觉得教皇可能连 ChatGPT 都没用过哈哈哈——

**芊悦**：你别说，梵蒂冈其实有自己的科技顾问团队的，人家没你想的那么 out。

**萌萌**：真的假的？好吧我收回。最后还有个——TechCrunch 报道说 VC 和创始人用虚高 ARR 打造 AI 独角兽，揭露估值泡沫里的数据注水。

**芊悦**：这个不意外。现在 AI 赛道太热了，很多公司把一次性合同收入算进 ARR，把免费试用用户算进付费用户，这种操作在上一波 SaaS 泡沫里就见过了。

**萌萌**：历史总是惊人地相似啊。泡沫总会破的，就看谁在裸泳了。

**芊悦**：没错。好了，总结一下今天——GTA6 终于发售，游戏行业的里程碑时刻；AI 算力需求从企业蔓延到政府层面；而在这一切技术狂奔中，记得保持清醒和人性。

**萌萌**：说得好！每天 5 分钟，掌握科技圈大小事。我们明天见～

</details>

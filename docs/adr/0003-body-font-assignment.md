# 字体角色分派:中文文楷、英文 serif、代码正体等宽

## 状态

accepted

## 决定

为兼顾手绘视觉语言与长时间读写,按字体角色分派正文与外壳字体:

- **中文**(段落、标题、列表、表格、外壳)使用「LXGW 文楷」。
- **正文 / 外壳 / 表格英文**使用 Latin serif(Charter → Georgia → Palatino)。
- **代码 / kbd / YAML**使用 Source Code Pro 正体;代码注释使用同族斜体。中文代码注释回退文楷。

正文继承主题的 `--font-sans-serif`,表格经 `--table-font-family`、标题经 `--font-heading` 指定字体;等宽场景由 `--font-monospace` 统一分派。

## 背景

延续 ADR-0001 确立的手绘语言,早期采用展示型中文手写体与斜体等宽英文。后续对比确认文楷更清晰,正文英文改用 serif;本轮进一步将代码从通篇斜体改为正体,保留注释的斜体语义。

## 早期考虑过的方案

- **正文英文全局替换**(含标题/界面):否 —— 范围限定在「段落英文」,标题/界面英文保持既有 sans,避免等宽斜体铺满整个界面。
- **删除 LXGW 文楷、只用 ZCOOL**:否 —— ZCOOL 为展示型字体,缺字风险高;保留文楷作回退最稳(代价:保留 25MB 字体文件)。
- **(采纳)段落英文 = Source Code Pro;中文全局 = ZCOOL(→文楷回退);代码 = Cascadia Code**。

## 早期结果与影响

- **修复既有 bug(路径)**:`base/` 拆分后 `@font-face` 仍用 `url("FileName.ext")`,从 `fusion-dark/base/foundation.css` 解析到 `fusion-dark/base/`(404),导致 Cascadia / LXGW **长期未加载**、中文一直回退系统字体。本次统一改为 `url("../FileName.ext")` 修复;新增字体同规则。今后 `base/` 内引用 `fusion-dark/` 的资源都须带 `../`。
- **可变斜体字体**:Source Code Pro 的 `@font-face` 声明 `font-weight: 200 900; font-style: normal`,使正文默认取用并呈斜体(等宽)。
- 新增两个字体文件入库 `fusion-dark/`:ZCOOL(1.5MB)、Source Code Pro(172KB)。
- 字体变量 `--font-sans-serif`、`--font-heading` 为每主题定义,4 套 `fusion-*.css` 已同步。

## 变更

- **2026-07-27**: 中文主字体由「站酷快乐体 ZCOOL KuaiLe」更换为「东京街角的小浪漫 DongJingJieJiao」(手写体,同契合手绘语言)。font-family 键 `"ZCOOL KuaiLe"` → `"DongJingJieJiao"`,文件 `ZCOOLKuaiLe-Regular.ttf` → `DongJingJieJiao-Regular.ttf`。英文 Source Code Pro、代码 Cascadia Code、回退文楷均不变;本 ADR 的整体分派策略不变。
- **2026-07-27(二)**: 字体体系精简为双字体——仅保留 Source Code Pro(英文/代码)与 DongJingJieJiao(中文)。删除 Cascadia Code(代码改用 Source Code Pro 等宽胜任)、LXGW 文楷(缺字改回退系统 sans),并清空所有具名回退字体(Open Sans/Helvetica/Arial/PingFang/Cambria/Consolas 等),仅留通用族 sans-serif/monospace 兜底。代价:DongJingJieJiao 为手写展示体、缺字风险高,删文楷后缺字将回退系统字体。
- **2026-07-27(三)**: 中文主字体由「东京街角的小浪漫 DongJingJieJiao」换回「LXGW 文楷」——综合对比后文楷清晰度最佳。`DongJingJieJiao-Regular.ttf` 删除、`LXGWWenKai-Regular.ttf` 恢复;font-family 键 `"DongJingJieJiao"` → `"LXGW WenKai"`;英文/代码 Source Code Pro 不变,双字体体系维持。
- **2026-10-19**: 同步当前正文英文 serif、等宽字体仅用于代码/kbd/YAML 的既有分派。本轮保留字体家族,新增 Source Code Pro 正体可变字体,将原 Italic 文件按 `font-style: italic` 注册,供注释取用。正文采用 16px / 1.8 行高、自然字距与词距,外壳保留原根字号;加粗文字继承周围文字颜色,以字重承担强调,保留手绘纸面与暖色配色。为保留既有满宽使用习惯,内容仍无宽度上限,窄窗口只收紧两侧留白。

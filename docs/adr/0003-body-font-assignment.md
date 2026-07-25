# 正文字体分派:中文站酷快乐体 + 英文 Source Code Pro(斜体等宽)

## 状态

accepted

## 决定

为契合手绘视觉语言,重新分派正文与界面字体:

- **中文**(段落、标题、列表、表格、界面外壳)统一用「站酷快乐体 ZCOOL KuaiLe」,缺字回退「LXGW 文楷」。
- **正文段落英文**用「Source Code Pro」(等宽·斜体·可变字重),呈打字机手写感。
- **代码 / kbd / 表格数据**仍用「Cascadia Code」。

中文全局化通过给 `--font-sans-serif` 追加 CJK 回退实现(拉丁字符仍走 Open Sans,**英文不受影响**);段落英文/中文由段落字体栈显式指定;标题经 `--font-heading` 指定。

## 背景

延续 ADR-0001 确立的手绘语言,用户希望正文更贴近「手写笔记」气质。ZCOOL 快乐体(圆润手写)+ Source Code Pro 斜体(打字机)的组合正是这一方向。

## 考虑过的方案

- **正文英文全局替换**(含标题/界面):否 —— 范围限定在「段落英文」,标题/界面英文保持既有 sans,避免等宽斜体铺满整个界面。
- **删除 LXGW 文楷、只用 ZCOOL**:否 —— ZCOOL 为展示型字体,缺字风险高;保留文楷作回退最稳(代价:保留 25MB 字体文件)。
- **(采纳)段落英文 = Source Code Pro;中文全局 = ZCOOL(→文楷回退);代码 = Cascadia Code**。

## 结果与影响

- **修复既有 bug(路径)**:`base/` 拆分后 `@font-face` 仍用 `url("FileName.ext")`,从 `fusion-dark/base/foundation.css` 解析到 `fusion-dark/base/`(404),导致 Cascadia / LXGW **长期未加载**、中文一直回退系统字体。本次统一改为 `url("../FileName.ext")` 修复;新增字体同规则。今后 `base/` 内引用 `fusion-dark/` 的资源都须带 `../`。
- **可变斜体字体**:Source Code Pro 的 `@font-face` 声明 `font-weight: 200 900; font-style: normal`,使正文默认取用并呈斜体(等宽)。
- 新增两个字体文件入库 `fusion-dark/`:ZCOOL(1.5MB)、Source Code Pro(172KB)。
- 字体变量 `--font-sans-serif`、`--font-heading` 为每主题定义,4 套 `fusion-*.css` 已同步。

# Fusion Typora Theme — 设计语言

`typora-fusion-dark-theme`：一套面向 Typora 的**纯暗色** CSS 主题集。所有主题共享同一套基础样式（`fusion-dark/base.css`），仅以变量层区分配色。

## 配色语义

**配色角色 (color role)**:
内容元素类型对应的颜色职能——标题、行内代码、链接、引用块、提示块等各为一个角色。原则：不同角色映射到不同颜色令牌。
_Avoid_: 配色方案（指整组令牌，不是单个职能）

**主色 / primary (`--primary-color`)**:
品牌与结构色。承载"结构骨架"角色：标题（H1–H6）、链接。也是各主题的品牌标识色。
_Avoid_: 强调色（含义模糊）

**次色 / secondary (`--secondary-color`)**:
辅助强调色。承载"行内强调/支撑"角色：行内代码、Note/Tip 提示块、Mermaid 节点描边、脚注引用。`--accent-color` 是其别名。
_Avoid_: 辅色

**角色碰撞 (role collision)**:
多个不同角色共用同一令牌（如标题与行内代码都用 primary），导致满屏一色、无区分度。新增强调元素前先判定：归入哪个现有角色，还是需要新令牌——避免再次碰撞。

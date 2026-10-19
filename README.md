# Fusion — Typora 主题集

> 🌐 **Language / 语言：** [English](README_en.md) | 简体中文

> 🎨 一套面向程序员与研究者的 [Typora](https://typora.io/) 主题集，融合 **Zeus** 侧栏风格与 **Phycat** 内容区设计，提供 **4 种全暖护眼配色方案**（墨紫 / petrol 绿 / Gruvbox / 枣红），全部达到 WCAG AA 以上对比度。

---

## 🎨 主题一览

| 主题 | 配色 | 主色调 | 背景色 | 正文对比度 | 护眼 |
|---|---|---|---|---|---|
| **Fusion Aubergine** | Dark + Warm Plum 🟣 | `#a06e80` | `#15120e` | ≈13:1 AAA | 🌿 |
| **Fusion Olive** | Dark + Petrol Green 🫒 | `#4a988e` | `#12150f` | ≈10.5:1 AAA | 🌿 |
| **Fusion Gruvbox** | Gruvbox Dark | `#fabd2f` | `#282828` | 10.2:1 AAA | 🌿 |
| **Fusion Maroon** | Dark + Warm Brick 🍂 | `#c47260` | `#15110f` | ≈11:1 AAA | 🌿 |

---

## ✨ 设计理念

**Fusion** 是一套混合主题集，汇聚多种风格之精华：

| 区域 | 风格来源 | 特征 |
|---|---|---|
| **侧栏** | Zeus | 简洁的 VS Code 风暗色面板 |
| **内容区** | 手绘语言 | 暖色纸面、墨色描边、克制的手绘装饰 |
| **语法高亮** | 各配色方案 | 对比鲜明、护眼的色彩令牌 |

架构：每个主题仅定义变量（~150 行），共享同一套基础样式（`fusion-dark/base.css`），实现一处修改全部生效。

---

## 📁 文件结构

```
typora-fusion-dark-theme/
├── fusion-dark/
│   ├── base.css               # 共享样式的 @import 清单
│   ├── base/                  # 按职责拆分的 8 个基础样式文件
│   ├── LXGWWenKai-Regular.ttf                  # 中文主字体（LXGW 文楷）
│   ├── SourceCodePro-VariableFont_wght.ttf       # 代码正体（等宽·可变字重）
│   ├── SourceCodePro-Italic-VariableFont_wght.ttf # 代码注释斜体
│   └── SourceCodePro-OFL.txt                    # Source Code Pro 字体许可
├── fusion-aubergine.css       # Dark + Warm Plum（旗舰）
├── fusion-olive.css           # Dark + Petrol Green
├── fusion-gruvbox.css         # Gruvbox Dark 🌿
└── fusion-maroon.css          # Dark + Warm Brick
```

---

## 🎨 功能亮点

### 标题系统（手绘装饰 + 层级差异）
- **H1** — 居中排版，聚焦/悬停时下划线动态展开（文档标题，不编号）
- **H2–H5** — 依次使用波浪下划线、左侧笔刷、直线下划线与点线下划线，编辑时隐藏装饰
- **H6** — 正文字号的标签体，以大写、字间距和段前留白区分
- 全部标题字重为 500，字号按正文比例递减，H5/H6 不小于正文；标题和目录均保留原文及手动序号

### 代码
- **围栏代码块** — macOS 红黄绿交通灯装饰、语言标签、Dracula 风语法着色
- **行内代码** — 次色徽章样式，悬停时加深底色
- **字体** — [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) 正体等宽字，注释使用同族斜体

### 内容元素
- **引用块** — 纸面、墨色描边与 💡 Emoji，悬停时加深边框
- **任务列表** — 手绘方框，勾选时对勾弹入
- **表格** — 纸面底色，单元格悬停高亮
- **链接** — 主色文字与原生下划线，悬停时提亮
- **高亮 / Mark** — 手绘马克笔底色
- **斜体** — 次色文字与斜体
- **加粗** — 继承周围文字颜色，以字重强调，悬停时出现同色底边
- **`<kbd>` 按键** — 墨色描边，悬停时轻微下压

### Callout 提示块（GitHub 风格）
| 类型 | 颜色 | 图标 |
|---|---|---|
| `[!NOTE]` | 蓝紫色 | 📝 |
| `[!TIP]` | 青色 | 💡 |
| `[!WARNING]` | 琥珀色 | ⚠️ |
| `[!IMPORTANT]` | 橙色 | 🔥 |
| `[!CAUTION]` | 红色 | 💀 |

### 目录（TOC）
纸面底色与墨色描边，带「📑 Contents」标题。按层级缩进，仅呈现标题原文，不额外生成编号。

### YAML 元数据块
纸面底色、墨色描边与右上角 `YAML` 徽章，悬停时加深底色。

### 侧栏（Zeus 风格）
- VS Code 风文件树，活动文件使用各主题主色标识
- 标签指示器使用主色下划线
- 极细滚动条（4px）
- 快速打开弹窗深色主题

### Mermaid 流程图
自定义深色覆盖：代码块背景节点、主题色边框、样式化边标签。

### 响应式布局
正文撑满可用宽度，默认 16px 字号、1.8 倍行高，使用自然字距与词距。两侧留白随窗口宽度在 20–40px 间调整；外壳保留原有字号。

### 打印支持
打印时使用浅色纸面与深色文字，引用、目录和表格同步去除深色底。代码块保留独立语法高亮，标题与代码块设有分页保护。

---

## 🚀 安装方法

1. 打开 Typora → **偏好设置 → 外观 → 打开主题文件夹**
2. 将你想要的主题文件（如 `fusion-aubergine.css`）和 `fusion-dark/` 目录复制到主题文件夹中
3. 重启 Typora（或刷新主题）
4. 在 **偏好设置 → 外观 → 主题** 中选择对应主题

> 💡 所有主题共享 `fusion-dark/` 资源目录，只需复制一次即可。

---

## 🎨 颜色参考（以 Fusion Aubergine 为例）

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg-color` | `#15120e` | 页面背景（暖纸） |
| `--text-color` | `#d6d2c9` | 主要文字 |
| `--text-color-secondary` | `#b8b2a6` | 段落、次要文字 |
| `--primary-color` | `#a06e80` | 暖墨紫强调（标题、链接、边框） |
| `--secondary-color` | `#c9b37a` | 暖金辅色 |
| `--side-bar-bg-color` | `#1a1712` | 侧栏背景 |
| `--code-block-bg` | `#2a2520` | 代码块背景（暖褐壳） |

> 其他主题的变量值请查阅对应 `fusion-*.css` 文件。

---

## 🔤 字体

| 字体 | 用途 | 来源 |
|---|---|---|
| Latin serif（Charter → Georgia → Palatino） | 英文正文 / UI / 表格（#14 Kami 排版气质） | 系统回退 |
| [霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | 中文正文 / 标题（楷体） | 已内置（`LXGWWenKai-Regular.ttf`） |
| [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) | 代码块 / 行内代码 / kbd / YAML，注释斜体 | 已内置正体与斜体可变字体，见 `fusion-dark/SourceCodePro-OFL.txt` |

---

## 🛠 自定义

所有设计令牌均为 **CSS 自定义属性**，定义于 `:root`。修改强调色示例：

```css
:root {
    --primary-color: #你的颜色;
    --hover-background-color: #你的颜色;
    --select-text-bg-color: rgba(R, G, B, 0.3);
}
```

调整正文排版（四套主题均提供相同变量）：

```css
:root {
    --body-font-size: 16px;
    --body-line-height: 1.8;
    --write-padding: 24px clamp(20px, 4vw, 40px);
}
```

---

## 📄 许可证

主题样式采用 MIT License，欢迎 Fork、修改与再分发。内置字体保留各自许可；Source Code Pro 采用 SIL Open Font License 1.1，完整许可与字体一起分发。

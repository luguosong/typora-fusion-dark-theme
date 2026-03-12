# Fusion Dark — Typora Theme

> 🌐 **Language / 语言：** English | [简体中文](README.md)

> 🖤 A programmer-focused dark theme for [Typora](https://typora.io/), blending **Zeus** sidebar aesthetics with **Phycat** content styling, accented in orange & blue.

---

## ✨ Design Philosophy

**Fusion Dark** is a hybrid theme that combines the best of two worlds:

| Layer | Style Source | Characteristics |
|---|---|---|
| **Sidebar** | Zeus | Clean VS Code–inspired dark panel |
| **Content Area** | Phycat | Rich animations, glass morphism, glow effects |
| **Syntax Highlight** | Dracula | Vibrant, contrast-friendly color tokens |

The primary palette uses a warm **orange** (`#e8944c`) as the accent and a cool **periwinkle blue** (`#9eaffa`) as the secondary color, set against a deep dark background (`#1e1e1e`).

---

## 🗂 File Structure

```
typora-fusion-dark-theme/
├── fusion-dark.css          # Main theme stylesheet (~1,674 lines)
└── fusion-dark/
    ├── CascadiaCode.woff2   # Monospace font (code blocks & inline code)
    └── LXGWWenKai-Regular.ttf  # Chinese serif font (body paragraphs)
```

---

## 🎨 Feature Highlights

### Heading System (6 distinct styles)
- **H1** — Centered, animated expanding underline bar on hover/focus
- **H2** — Glass morphism card with radial gradient background
- **H3** — Left accent bar that grows on hover
- **H4** — Filled orange dot marker with slide animation
- **H5** — Circle outline marker with glow
- **H6** — Dash (`-`) prefix with color transition

### Code
- **Fenced Code Blocks** — macOS traffic-light dots decoration, language label, Dracula-inspired syntax tokens
- **Inline Code** — Orange tinted badge, bouncy scale-up on hover
- **Font** — [Cascadia Code](https://github.com/microsoft/cascadia-code) (ligature-ready monospace)

### Content Elements
- **Blockquotes** — Rounded card with 💡 emoji, glowing border on hover
- **Task Lists** — Animated circular checkbox with glow pulse on check
- **Tables** — Glass morphism style with per-cell hover highlight
- **Links** — Inline SVG link icon that rotates on hover, neon text-shadow
- **Highlights / Mark** — Gradient fill-up animation on hover
- **Italic** — Animated stitched underline pattern
- **Bold** — Orange accent color with bottom-border glow
- **`<kbd>`** — 3D key cap with press-down animation

### Callouts / Alerts (GitHub-style)
| Type | Color | Emoji |
|---|---|---|
| `[!NOTE]` | Blue/Purple | 📝 |
| `[!TIP]` | Cyan | 💡 |
| `[!WARNING]` | Amber | ⚠️ |
| `[!IMPORTANT]` | Orange | 🔥 |
| `[!CAUTION]` | Red | 💀 |

### Table of Contents (TOC)
Glass morphism card with a dual-gradient background, smooth hover lift, and a labeled "📑 Contents" header.

### YAML Front Matter
Dashed-border card with a floating `YAML` badge; transitions to solid border on hover.

### Sidebar (Zeus Style)
- VS Code–style file tree with active-file orange left border
- Orange-glowing tab indicators
- Minimal scrollbars (4px)
- Quick-open popup with dark styling

### Mermaid Diagrams
Custom dark overrides: Dracula background nodes, primary-color borders, styled edge labels.

### Responsive Layout
| Viewport | Content Max-Width |
|---|---|
| `< 1400px` | 950px |
| `≥ 1400px` | 1024px |
| `≥ 1800px` | 1200px |

### Print Support
Color-accurate print styles, page-break guards on headings and code blocks, text-shadow removal for clean output.

---

## 🚀 Installation

1. Open Typora → **Preferences → Appearance → Open Theme Folder**
2. Copy `fusion-dark.css` and the `fusion-dark/` directory into the theme folder
3. Restart Typora (or refresh themes)
4. Select **Fusion Dark** from **Preferences → Appearance → Theme**

---

## 🎨 Color Reference

| Variable | Value | Role |
|---|---|---|
| `--bg-color` | `#1e1e1e` | Page background |
| `--text-color` | `#d4d4d4` | Primary text |
| `--text-color-secondary` | `#9ca3af` | Paragraphs, muted text |
| `--primary-color` | `#e8944c` | Orange accent (headings, links, borders) |
| `--secondary-color` | `#9eaffa` | Blue accent (italic, note callout) |
| `--side-bar-bg-color` | `#252526` | Sidebar background |
| `--code-block-bg` | `#282a36` | Code block background (Dracula) |

---

## 🔤 Fonts

| Font | Usage | Source |
|---|---|---|
| [Cascadia Code](https://github.com/microsoft/cascadia-code) | Code blocks, inline code, kbd | Bundled (`CascadiaCode.woff2`) |
| [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | Body paragraphs (CJK & serif fallback) | Bundled (`LXGWWenKai-Regular.ttf`) |
| Open Sans / System Sans | UI & headings | System fallback |

---

## 🛠 Customization

All design tokens are defined as **CSS custom properties** in `:root`. To change the accent color:

```css
:root {
    --primary-color: #your-color;
    --glow-color: rgba(R, G, B, 0.6);   /* match primary */
    --hover-background-color: #your-color;
    --select-text-bg-color: rgba(R, G, B, 0.3);
}
```

---

## 📄 License

MIT License — feel free to fork, modify, and redistribute.

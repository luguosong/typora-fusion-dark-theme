# Fusion — Typora Theme

> 🌐 **Language / 语言：** English | [简体中文](README.md)

> 🖤 A programmer-focused dark theme for [Typora](https://typora.io/), blending **Zeus** sidebar aesthetics with **Phycat** content styling — **4 warm, eye-friendly color schemes** (plum / petrol green / Gruvbox / brick), all meeting WCAG AA contrast.

---

## 🎨 Theme Overview

| Theme | Palette | Primary | Background | Contrast | Eye-friendly |
|---|---|---|---|---|---|
| **Fusion Aubergine** | Dark + Warm Plum 🟣 | `#a06e80` | `#15120e` | ≈13:1 AAA | 🌿 |
| **Fusion Olive** | Dark + Petrol Green 🫒 | `#4a988e` | `#12150f` | ≈10.5:1 AAA | 🌿 |
| **Fusion Gruvbox** | Gruvbox Dark | `#fabd2f` | `#282828` | 10.2:1 AAA | 🌿 |
| **Fusion Maroon** | Dark + Warm Brick 🍂 | `#c47260` | `#15110f` | ≈11:1 AAA | 🌿 |

---

## ✨ Design Philosophy

**Fusion** is a hybrid theme combining the best of multiple worlds:

| Layer | Style Source | Characteristics |
|---|---|---|
| **Sidebar** | Zeus | Clean VS Code–inspired dark panel |
| **Content Area** | Hand-drawn language | Warm paper surfaces, ink borders, restrained sketch marks |

Architecture: each theme is a variable-only file (~150 lines) that shares a single structural base (`fusion-dark/base.css`).

---

## 🗂 File Structure

```
typora-fusion-dark-theme/
├── fusion-dark/
│   ├── base.css               # Shared stylesheet import manifest
│   ├── base/                  # Eight shared stylesheets, grouped by responsibility
│   ├── LXGWWenKai-Regular.ttf                  # Chinese body/heading font (kaiti)
│   ├── SourceCodePro-VariableFont_wght.ttf       # Upright variable monospace
│   ├── SourceCodePro-Italic-VariableFont_wght.ttf # Italic code comments
│   └── SourceCodePro-OFL.txt                    # Source Code Pro license
├── fusion-aubergine.css       # Dark + Warm Plum (flagship)
├── fusion-olive.css           # Dark + Petrol Green
├── fusion-gruvbox.css         # Gruvbox Dark 🌿
└── fusion-maroon.css          # Dark + Warm Brick
```

---

## 🎨 Feature Highlights

### Heading System (hand-drawn marks + distinct levels)
- **H1** — Centered, animated expanding underline bar on hover/focus
- **H2–H5** — Wave underline, left brush stroke, line underline, and dotted underline; decorations hide while editing
- **H6** — Body-sized label distinguished by uppercase, letter spacing, and space above
- All headings use weight 500 and sizes relative to body text. H5/H6 remain at least body-sized; headings and TOC preserve original text and manual numbering

### Code
- **Fenced Code Blocks** — macOS traffic-light dots decoration, language label, Dracula-inspired syntax tokens
- **Inline Code** — Secondary-color badge with a darker background on hover
- **Font** — Upright [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) monospace, with italic code comments

### Content Elements
- **Blockquotes** — Paper surface with 💡 emoji and an ink border that darkens on hover
- **Task Lists** — Hand-drawn square checkbox with an appearing check mark
- **Tables** — Paper surface with per-cell hover highlight
- **Links** — Primary-color text and native underline, brightening on hover
- **Highlights / Mark** — Hand-drawn marker background
- **Italic** — Secondary-color italic text
- **Bold** — Inherits surrounding text color and uses weight for emphasis, with a matching bottom border on hover
- **`<kbd>`** — Ink border with a small press-down motion on hover

### Callouts / Alerts (GitHub-style)
| Type | Color | Emoji |
|---|---|---|
| `[!NOTE]` | Blue/Purple | 📝 |
| `[!TIP]` | Cyan | 💡 |
| `[!WARNING]` | Amber | ⚠️ |
| `[!IMPORTANT]` | Orange | 🔥 |
| `[!CAUTION]` | Red | 💀 |

### Table of Contents (TOC)
Paper surface with an ink border and a "📑 Contents" header. Entries use hierarchical indentation and preserve the heading text without adding numbers.

### YAML Front Matter
Paper surface with an ink border and a `YAML` badge; the background darkens on hover.

### Sidebar (Zeus Style)
- VS Code–style file tree with active-file markers in each theme's primary color
- Primary-color underline tab indicators
- Minimal scrollbars (4px)
- Quick-open popup with dark styling

### Mermaid Diagrams
Custom dark overrides: code-background nodes, theme-colored borders, and styled edge labels.

### Responsive Layout
Content fills the available width with 16px body text, 1.8 line height, and natural letter and word spacing. Horizontal padding adapts between 20–40px; shell text keeps its existing size.

### Print Support
Light paper and dark text for printing, with dark surfaces removed from quotes, TOC, and tables. Code blocks retain their syntax palette; headings and code blocks have page-break guards.

---

## 🚀 Installation

1. Open Typora → **Preferences → Appearance → Open Theme Folder**
2. Copy `fusion-aubergine.css` and the `fusion-dark/` directory into the theme folder
3. Restart Typora (or refresh themes)
4. Select **Fusion Aubergine** (or another Fusion theme) from **Preferences → Appearance → Theme**

---

## 🎨 Color Reference

| Variable | Value | Role |
|---|---|---|
| `--bg-color` | `#15120e` | Page background (warm paper) |
| `--text-color` | `#d6d2c9` | Primary text |
| `--text-color-secondary` | `#b8b2a6` | Paragraphs, muted text |
| `--primary-color` | `#a06e80` | Warm plum accent (headings, links, borders) |
| `--secondary-color` | `#c9b37a` | Warm gold secondary |
| `--side-bar-bg-color` | `#1a1712` | Sidebar background |
| `--code-block-bg` | `#2a2520` | Code block background (warm chrome) |

---

## 🔤 Fonts

| Font | Usage | Source |
|---|---|---|
| Latin serif (Charter → Georgia → Palatino) | English body / UI / tables (#14 Kami typography) | System fallback |
| [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | Chinese body / headings (kaiti) | Bundled (`LXGWWenKai-Regular.ttf`) |
| [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) | Code blocks / inline code / kbd / YAML, with italic comments | Upright and italic variable fonts bundled; see `fusion-dark/SourceCodePro-OFL.txt` |

---

## 🛠 Customization

All design tokens are defined as **CSS custom properties** in `:root`. To change the accent color:

```css
:root {
    --primary-color: #your-color;
    --hover-background-color: #your-color;
    --select-text-bg-color: rgba(R, G, B, 0.3);
}
```

To adjust body typography (all four themes expose the same tokens):

```css
:root {
    --body-font-size: 16px;
    --body-line-height: 1.8;
    --write-padding: 24px clamp(20px, 4vw, 40px);
}
```

---

## 📄 License

Theme styles use the MIT License. Bundled fonts retain their own licenses; Source Code Pro uses the SIL Open Font License 1.1, distributed alongside the font files.

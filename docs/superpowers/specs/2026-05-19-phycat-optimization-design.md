# Phycat 风格优化设计文档

> 参考 [sumruler/typora-theme-phycat](https://github.com/sumruler/typora-theme-phycat) 对 Fusion 主题进行全面视觉优化

## 概述

三个优化模块，按优先级排序：

1. **大纲面板全面升级** — 药丸样式 + ✦ 闪烁 + 编号 + 缩进
2. **标题 H2-H6 视觉差异化** — 各级标题独立装饰风格
3. **行内样式交互增强 + 小改进** — strong/em/mark/del 动画增强 + figcaption + letter-spacing

---

## 模块一：大纲面板全面升级

### 当前状态

- 大纲项无层级缩进（刚加的 `.outline-content ul { padding-left: 15px }` 未生效）
- 活动项仅有简单背景高亮
- 无编号、无闪烁动画

### 目标

移植 Phycat 的大纲面板方案：

#### 1. 药丸形项目

```css
#outline-content .outline-item {
    display: flex;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    padding: 6px 12px;
    margin-bottom: 2px;
    color: var(--text-color-secondary);
    border-radius: 50px;          /* 药丸形 */
    border: 1px solid transparent;
    transition: background-color 0.2s ease, color 0.2s ease, padding-left 0.2s ease, border-color 0.2s ease;
    line-height: 1.6;
}
```

#### 2. 层级缩进（通过 .outline-h2~h6 类选择器）

```css
/* 删除之前的 .outline-content ul { padding-left: 15px; } */
#outline-content .outline-h2,
#outline-content .outline-h3,
#outline-content .outline-h4,
#outline-content .outline-h5,
#outline-content .outline-h6 {
    border-left: 1.5px solid var(--outline-line-color);
    margin-left: 22px;
    padding-left: 8px;
}
```

#### 3. ✦ 闪烁动画

```css
@keyframes outline-twinkle {
    from { opacity: 0.5; transform: translateY(-50%) scale(0.8); }
    to   { opacity: 1;   transform: translateY(-50%) scale(1.2); }
}

#outline-content .outline-item-active::after {
    content: "✦";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: var(--primary-color);
    animation: outline-twinkle 1.5s infinite alternate;
}
```

#### 4. 大纲编号（CSS 计数器）

在 `.outline-label::before` 上添加计数器：

```css
.outline-content { counter-reset: h1; }
.outline-h1 { counter-reset: h2; }
.outline-h2 { counter-reset: h3; }
/* ... 依此类推 */

.outline-content .outline-h1 > .outline-item > .outline-label::before {
    counter-increment: h1;
    content: counter(h1) ". ";
    color: var(--primary-color);
}
/* ... h2~h6 依此类推 */
```

编号格式与正文标题保持一致（使用独立计数器，不干扰正文）。

#### 5. hover 效果

```css
#outline-content .outline-item:hover {
    background-color: color-mix(in srgb, var(--primary-color), transparent 90%);
    color: var(--text-bright);
    padding-left: 18px;           /* 悬停时右移 */
}
```

### 新增变量（所有主题文件 :root 同步）

```css
--outline-line-color: rgba(255, 255, 255, 0.05);    /* 层级竖线颜色（深色主题白色系，浅色主题黑色系） */
```

深色主题用白色低透明度，浅色主题用黑色低透明度。

### 修改文件

| 文件 | 改动 |
|------|------|
| `base.css` | Outline Panel Section 重写，删除 `.outline-content ul { padding-left }` |
| `fusion-dark-orange.css` | 添加 `--outline-line-color` |
| `fusion-solarized.css` | 添加 `--outline-line-color` |
| `fusion-gruvbox.css` | 添加 `--outline-line-color` |
| `fusion-academic-light.css` | 添加 `--outline-line-color`（黑色系） |
| `fusion-academic-dark.css` | 添加 `--outline-line-color` |

---

## 模块二：标题 H2-H6 视觉差异化

### 当前状态

H2-H6 统一使用「渐变下划线 + 编号」，仅通过字号和下划线宽度区分层级。

### 目标

各级标题使用独立装饰风格：

#### H2 — 玻璃卡片背景

```css
#write h2 {
    font-size: 1.4rem;
    width: fit-content;
    padding: 0 10px;
    border-radius: 8px;
    backdrop-filter: blur(8px);
    background-image: var(--h2-bg-image);
    border-top: 1px solid var(--overlay-8);
    transition: background-image 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease;
    /* 移除渐变下划线 */
}

#write h2:hover {
    background-image: var(--h2-bg-image-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--shadow-20);
}
```

#### H3 — 左侧竖条装饰

```css
#write h3 {
    padding-left: 15px;
    /* 移除渐变下划线 */
}

#write h3::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    background: var(--primary-color);
    border-radius: 2px;
    opacity: 0.8;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

#write h3:hover::before {
    height: 60%;
    opacity: 1;
    box-shadow: var(--glow-shadow-box);
}
```

#### H4 — 实心圆点前缀

```css
#write h4 {
    display: flex;
    align-items: center;
    /* 移除渐变下划线 */
}

#write h4::before {
    content: "";
    margin-right: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary-color);
    transition: all 0.3s ease;
}

#write h4:hover::before {
    transform: scale(1.2);
    box-shadow: var(--glow-shadow-box);
}
```

#### H5 — 空心圆前缀

```css
#write h5::before {
    content: "";
    margin-right: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.5px solid var(--primary-color);
    transition: all 0.3s ease;
}
```

#### H6 — 破折号前缀

```css
#write h6::before {
    content: "-";
    margin-right: 7px;
    color: var(--primary-color);
    font-weight: 700;
    transition: all 0.3s ease;
}
```

### 编号处理

H2-H6 的 CSS 计数器编号保留。H2 的编号通过 `::after` 放在标题右侧（因为 `::before` 用于背景/竖条），H3-H6 的编号放在 `::before` 中装饰元素之后。

实际上，Phycat 的做法更简单：H2 的 `::before` 用于编号，H3-H6 用 `> span:first-of-type::before` 放编号。但由于我们已有 `counter-set` 机制，可以保留现有编号方式，将装饰元素移到 `::after` 或调整位置。

**简化方案**：保留当前编号机制不变，装饰通过 `::after` 实现（H2 的玻璃背景直接在 h2 上，不需要伪元素；H3 的竖条用 `::after` 而非 `::before`）。

### 新增变量

```css
/* 深色主题示例（每个主题自定义渐变方向和色值） */
--h2-bg-image: linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 95%), transparent);
--h2-bg-image-hover: linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 85%), transparent);
```

### 对浅色主题的影响

- `backdrop-filter: blur()` 在浅色背景下效果有限，学术浅色主题可通过变量覆盖 `--h2-bg-image` 为简单颜色
- H3-H6 的竖条/圆点/空心圆/破折号在浅色主题下同样适用，无需特殊处理

### 修改文件

| 文件 | 改动 |
|------|------|
| `base.css` | Headings Section 重写 H2-H6 默认样式 |
| `fusion-dark-orange.css` | 添加 `--h2-bg-image`、`--h2-bg-image-hover` |
| `fusion-solarized.css` | 同上 |
| `fusion-gruvbox.css` | 同上 |
| `fusion-academic-light.css` | 同上（覆盖为适合浅色的值） |
| `fusion-academic-dark.css` | 同上 |

---

## 模块三：行内样式交互增强 + 小改进

### 3a. 行内样式增强

#### strong — 弹跳动画

```css
#write strong {
    color: var(--primary-color);
    transition: transform 0.2s cubic-bezier(0.5, 1.5, 0.5, 1);
}

#write strong:hover {
    transform: translateY(-2px) scale(1.1);
    text-shadow: 0 0 10px var(--primary-color);
}
```

#### em — 波浪下划线

```css
#write em:hover {
    color: var(--primary-color);
    text-decoration: underline wavy var(--primary-color);
    text-underline-offset: 4px;
    text-shadow: var(--glow-shadow-box);
}
```

#### mark — 多层霓虹发光

```css
#write mark:hover {
    color: var(--text-bright);
    background-color: color-mix(in srgb, var(--primary-color), transparent 80%);
    text-shadow:
        0 0 1px var(--text-bright),
        0 0 5px var(--text-bright),
        0 0 15px var(--primary-color),
        0 0 30px var(--primary-color);
    transform: scale(1.05);
}
```

#### del — 删除线变色 + 禁止光标

```css
#write del {
    text-decoration: line-through;
    text-decoration-color: var(--primary-color);
    color: var(--text-color-secondary);
    opacity: 0.7;
}

#write del:hover {
    color: var(--primary-color);
    text-decoration-color: var(--secondary-color);
    cursor: not-allowed;
}
```

### 3b. 小改进

#### figcaption 图片标题

```css
#write figcaption {
    display: block;
    margin-top: 12px;
    font-size: 13px;
    color: var(--text-color-secondary);
    text-align: center;
    opacity: 0.7;
    transition: color 0.3s ease, opacity 0.3s ease;
}

#write figure:hover figcaption,
#write p:hover figcaption {
    color: var(--primary-color);
    opacity: 0.9;
}
```

#### letter-spacing 微调

```css
/* 在 #write 添加 */
letter-spacing: 0.5px;
```

使用 0.5px 而非 Phycat 的 1.1px，因为中文排版不需要过大字间距。

### 修改文件

| 文件 | 改动 |
|------|------|
| `base.css` | Inline Styles Section 修改 strong/em/mark/del hover；Images Section 添加 figcaption；Content Area Section 添加 letter-spacing |

**不需要修改主题变量文件**（全部使用已有变量）。

---

## 实施顺序

1. **模块一：大纲面板** — 独立改动，不影响其他模块
2. **模块二：标题差异化** — 涉及 base.css Headings Section 重写 + 所有主题变量文件
3. **模块三：行内样式 + 小改进** — 改动最小，纯 base.css

## 测试清单

每个模块完成后需在所有 5 个主题中验证：

- [ ] 左侧大纲层级缩进 + 编号 + 闪烁动画
- [ ] H2 玻璃卡片效果（深色/浅色主题均需测试）
- [ ] H3 竖条 hover 伸长
- [ ] H4 圆点 / H5 空心圆 / H6 破折号装饰
- [ ] strong/em/mark/del hover 动画
- [ ] figcaption 居中 + hover 变色
- [ ] 打印预览无异常（装饰元素应在打印中隐藏或降级）

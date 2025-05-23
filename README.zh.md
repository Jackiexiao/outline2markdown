# outline2markdown (中文说明)

> 一款将多层级大纲一键转换为 Markdown 的网页工具。

[English Version](./README.md) | [开发历程 (中文)](./Dev.zh.md)

## 项目结构

-   `index.html`：主入口网页，包含全部功能和界面。
-   `outline-converter.js`：核心转换逻辑的 JavaScript 文件。
-   `README.md`：项目说明文档（英文版）。
-   `README.zh.md`：项目说明文档（中文版）。
-   `Dev.md`：开发过程记录（英文版）。
-   `Dev.zh.md`：开发过程记录（中文版）。

## 功能介绍

-   **多格式输入**：支持直接粘贴文本、输入内容，或通过拖拽/点击上传 `.txt`、`.md` 文件。
-   **智能转换**：
    -   **自动模式（推荐）**：智能检测大纲层级，自动判断哪些层级适合转换为 Markdown 标题，哪些保持为列表项，优化输出结构。
    -   **手动模式**：用户可自定义将大纲的前几层转换为 Markdown 标题 (H1-H6)。
-   **标题偏移**：可将所有转换后的 Markdown 标题整体提升或降低级别（例如，全部+1级，使 H1 变为 H2，H2 变为 H3 等）。
-   **便捷输出**：一键复制转换结果到剪贴板，或直接下载为 `.md` 格式的 Markdown 文件。
-   **用户体验**：
    -   现代化、美观的用户界面，使用 Tailwind CSS 和 FontAwesome 图标。
    -   响应式设计，适配桌面和平板设备。
    -   支持中英文双语，自动检测浏览器语言，并提供手动切换选项。
-   **纯前端实现**：无需服务器，所有操作均在浏览器端完成，快速、安全、保护隐私。
-   **友情链接**：包含指向 [01mvp.com](https://01mvp.com) 的友情链接。

## 使用方法

1.  在浏览器中直接打开 `index.html` 文件。
2.  **输入大纲**：
    -   在左侧文本框中直接粘贴或输入您的多层级无序列表。
    -   将 `.txt` 或 `.md` 文件拖拽到指定区域上传。
    -   点击"上传"按钮选择文件上传。
    -   点击"恢复示例"按钮加载内置的示例文本。
3.  **选择转换模式**：
    -   **自动检测 (推荐)**：工具将自动分析您的输入，智能决定标题层级。
    -   **手动层级数**：选择此项后，您可以指定将大纲的前多少层转换为 Markdown 标题。
4.  **（可选）调整标题级别整体偏移**：根据需要，选择是否将所有标题的级别统一增加。
5.  **查看结果**：转换后的 Markdown 内容将实时显示在右侧的文本框中。
6.  **导出内容**：
    -   点击"复制结果"按钮，将 Markdown 文本复制到剪贴板。
    -   点击"下载 Markdown"按钮，将内容保存为 `.md` 文件。
7.  **切换语言**：点击页面右上角的"中文 / EN"按钮切换界面语言。

## 设计亮点

-   现代化的渐变背景、圆角卡片设计、平滑的过渡动画。
-   清晰的交互元素，如按钮高亮、即时操作反馈。
-   使用 Unsplash 图片作为随机 Logo，增添视觉趣味。
-   简洁高效的纯前端实现，依赖项均通过 CDN 加载，无需本地构建或 Node.js 环境。

## 依赖说明

-   [Tailwind CSS](https://tailwindcss.com/) (CDN)
-   [FontAwesome](https://fontawesome.com/) (CDN)

## 版权声明

-   本工具由 [01mvp.com](https://01mvp.com) 项目启发并得到其友情支持，主要用于学习、演示和交流目的。 
# outline2markdown

> A web tool to convert multi-level outlines to Markdown with a single click.

[中文文档](./README.zh.md) | [Development Log](./Dev.md)

## Project Structure

-   `index.html`: The main entry point, containing all features and UI.
-   `outline-converter.js`: JavaScript file with the core conversion logic.
-   `README.md`: This project description file (English).
-   `README.zh.md`: Project description file (Chinese).
-   `Dev.md`: Development process log (English).
-   `Dev.zh.md`: Development process log (Chinese).

## Features

-   **Multiple Input Formats**: Supports pasting text, direct input, or uploading `.txt` and `.md` files via drag-and-drop or a file dialog.
-   **Intelligent Conversion**:
    -   **Auto Mode (Recommended)**: Intelligently detects outline levels, automatically determining which levels are suitable for Markdown headers and which should remain as list items, optimizing the output structure.
    -   **Manual Mode**: Allows users to define how many initial levels of the outline are converted into Markdown headers (H1-H6).
-   **Header Offset**: Globally increase or decrease the level of all converted Markdown headers (e.g., +1 level shifts H1 to H2, H2 to H3, etc.).
-   **Convenient Output**: One-click copy of the converted result to the clipboard, or direct download as an `.md` Markdown file.
-   **User Experience**:
    -   Modern and aesthetically pleasing UI using Tailwind CSS and FontAwesome icons.
    -   Responsive design, adapting to both desktop and tablet devices.
    -   Bilingual support (English/Chinese) with automatic browser language detection and a manual toggle.
-   **Pure Front-end Implementation**: No server-side processing; all operations occur in the browser, ensuring speed, security, and privacy.
-   **Friendship Link**: Includes a link to [01mvp.com](https://01mvp.com).

## How to Use

1.  Open the `index.html` file directly in your browser.
2.  **Input Outline**:
    -   Paste or type your multi-level unordered list directly into the left-hand textarea.
    -   Drag and drop a `.txt` or `.md` file onto the designated drop zone.
    -   Click the "Upload" button to select a file.
    -   Click the "Load Demo" button to populate the input with a built-in example.
3.  **Select Conversion Mode**:
    -   **Auto-detect (Recommended)**: The tool will analyze your input and intelligently determine header levels.
    -   **Manual Levels**: If selected, you can specify how many initial levels of your outline should be converted to Markdown headers.
4.  **(Optional) Adjust Header Level Offset**: If needed, choose whether to uniformly increase the level of all generated headers.
5.  **View Result**: The converted Markdown content will appear in real-time in the right-hand textarea.
6.  **Export Content**:
    -   Click the "Copy Result" button to copy the Markdown text to your clipboard.
    -   Click the "Download Markdown" button to save the content as an `.md` file.
7.  **Switch Language**: Click the "中文 / EN" toggle in the top-right of the page to switch the UI language.

## Design Highlights

-   Modern design with gradient backgrounds, rounded cards, and smooth animations.
-   Clear interactive elements, such as button highlighting and instant feedback.
-   Uses a random Unsplash image as a logo for visual interest.
-   Clean and efficient pure front-end implementation; dependencies are loaded via CDN, requiring no local build or Node.js environment.

## Dependencies

-   [Tailwind CSS](https://tailwindcss.com/) (CDN)
-   [FontAwesome](https://fontawesome.com/) (CDN)

## Credits

-   This tool was inspired by and kindly supported by the [01mvp.com](https://01mvp.com) project, primarily for learning, demonstration, and communication purposes. 
# Dev.md: Building outline2markdown with AI Assistance

This document outlines the rapid development process of the `outline2markdown` web tool, built in approximately 30-60 minutes with significant assistance from an AI pair programmer (Gemini via Cursor).

## Project Goal

Create a client-side HTML/CSS/JS web tool that converts multi-level outlines (from text input or file upload) into Markdown. Key features include:
-   Pasting text or uploading `.txt`/`.md` files.
-   Converting nested lists to Markdown headers and lists.
-   User-configurable header levels (manual and auto-detect mode).
-   Header level offsetting.
-   Copying output to clipboard or downloading as an `.md` file.
-   Modern, responsive UI (Tailwind CSS, FontAwesome).
-   Internationalization (EN/ZH) with browser language detection.
-   Drag-and-drop file upload.
-   Friendship link to 01mvp.com.

## Development Process & AI Interaction (Prompts & Iteration)

The development was highly iterative, relying on prompts to the AI assistant in Cursor to generate, refactor, and debug code.

**Initial Prompt (Paraphrased from user's first message):**
*User: "Help me build an outline2markdown web tool. It should take multi-level unordered lists and convert them. Provide an HTML site with Tailwind CSS, FontAwesome, responsive design, using CDNs. It should handle text input, file upload, copy, and download. Given example input/output. Allow users to choose how many levels become headers. Link to 01mvp.com."*

**AI Response & Iteration 1:**
-   The AI generated a single `index.html` file with HTML structure, Tailwind classes, FontAwesome icons (via CDN), and initial JavaScript logic for:
    -   Basic UI (text areas, buttons).
    -   A core `outline2markdown` function (handling tab/space indentations).
    -   File input, copy, and download functionality.
    -   A dropdown to select the number of levels to convert to headers.
    -   Default example text.
-   A `README.md` was also generated.

**Prompt 2 (Refining Logic & Example):**
*User: "The example is confusing. Use this simpler input/output. Default to H2-H3, then list items. User should select header start and end levels."*

**AI Response & Iteration 2:**
-   The AI updated `index.html`:
    -   Changed the default example in the textarea.
    -   Modified the `outline2markdown` JS function to accept `headerStartLevel` and `headerEndLevel`.
    -   Updated the UI to have two dropdowns for start and end header levels.

**Prompt 3 (Simplifying Controls):**
*User: "Change settings: 1. How many levels to convert (default 2). 2. Header offset option (+0, +1, +2)."*

**AI Response & Iteration 3:**
-   The AI refactored the UI in `index.html`:
    -   Replaced start/end level dropdowns with a single "Header Count" dropdown and an "Header Offset" dropdown.
    -   Adjusted the `outline2markdown` function in the `<script>` tag to match this new logic.

**Prompt 4 (Code Quality & Modularity):**
*User: "The logic is getting complex. Move the conversion function to a separate JS file and write some unit tests (conceptual)."*

**AI Response & Iteration 4:**
-   The AI created `outline-converter.js`.
-   Moved `outline2markdown` and its helper `getLevel` into this new file.
-   Updated `index.html` to include `<script src="outline-converter.js"></script>` and removed the inline functions.
-   Provided a list of conceptual unit test cases in the chat to verify the logic.
-   The AI also addressed linter suggestions for the new JS file (e.g., `const` over `let`, `for...of` over `forEach`).

**Prompt 5 (Auto-Detection Feature):**
*User: "Add an auto-detect mode for header count. Example: `3.1` under `- 3` shouldn't be `### 3.1` if it has no children. Differentiate this from manual mode. Add tests."*

**AI Response & Iteration 5:**
-   The AI designed and implemented `outline2markdownAuto` in `outline-converter.js`.
    -   This function parses the outline, analyzes child counts for L1 items to decide if they should be headers or demoted to list items.
-   Updated `index.html` UI:
    -   Added a "Conversion Mode" dropdown (Auto/Manual).
    -   "Auto" mode calls `outline2markdownAuto`; "Manual" mode shows the "Header Count" dropdown and calls the original `outline2markdown`.
-   Provided conceptual unit tests for the new auto mode.

**Prompt 6 (Final Enhancements - Current Request):**
*User: "1. i18n (EN/ZH, browser detect). 2. Explain Auto/Manual modes. 3. Drag-and-drop upload. 4. Create this Dev.md document."*

**AI Response & Iteration 6 (This step):**
-   The AI implemented internationalization in `index.html`:
    -   Added `data-translate-key` attributes to HTML elements.
    -   Created a `translations` object in JS for EN and ZH strings.
    -   Added JS for browser language detection and a manual language switcher.
    -   Included UI text explaining Auto vs. Manual modes (translatable).
-   Integrated drag-and-drop file upload functionality into `index.html`.
-   Generated this `Dev.md` document.

## Deployment with Vercel

This project, being entirely client-side (HTML, CSS, JS with no backend build process), is ideally suited for static hosting platforms like Vercel.

1.  **Push to GitHub:** The codebase (index.html, outline-converter.js, README.md, Dev.md) is pushed to a GitHub repository.
2.  **Connect to Vercel:**
    -   Sign up/log in to Vercel.
    -   Import the GitHub repository.
    -   Vercel automatically detects it as a static site.
    -   No special build commands or framework presets are needed.
3.  **Deploy:** Click "Deploy". Vercel hosts the site, providing a URL, typically within seconds to a minute.

This setup allows for extremely fast deployment and iteration. Any push to the connected GitHub branch can trigger an automatic redeploy on Vercel.

## Conclusion

Using Cursor with its integrated AI, this `outline2markdown` tool was developed rapidly. The process involved clear, iterative prompting, with the AI handling much of the boilerplate code generation, refactoring based on new requirements, and even assisting with debugging and best practice suggestions. This significantly accelerated the development timeline, allowing for a feature-rich tool to be created in a very short period. 
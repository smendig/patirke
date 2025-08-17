# Developer guide

## 1. Project Overview

The goal of this document is to serve as a complete guide for any developer or LLM agent tasked with maintaining or extending the project.

-   **Purpose**: A personal portfolio to showcase professional work, including a CV, photo gallery, videos, and contact information.
-   **Live URL**: [https://patirke.com/](https://patirke.com/)
-   **Tech Stack**:
-   **Framework**: [Nuxt.js](https://nuxt.com/) v4 (a [Vue.js](https://vuejs.org/) framework)
    -   **Language**: [TypeScript](https://www.typescriptlang.org/)
    -   **Styling**: [Sass](https://sass-lang.com/) (SCSS)
    -   **Package Manager**: npm
    -   **Linting**: ESLint
    -   **Type Checking**: `vue-tsc`
-   **Architecture**: The project is a **statically generated site (SSG)**. The `npm run generate` command builds all pages into static HTML, CSS, and JavaScript files, which are then served from a hosting provider.
-   **Hosting & Deployment**: The site is hosted on **Cloudflare Pages** and deployed automatically via **GitHub Actions**.
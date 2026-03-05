# 🔺 next-antd-tailwind 🔺

## 📘 About

A boilerplate for Next.js integrated with Ant Design, tailwindcss and a lot of useful tools/library.

## 📝 Table of Contents

- [🔺 next-antd-tailwind 🔺](#-next-antd-tailwind-)
  - [📘 About](#-about)
  - [📝 Table of Contents](#-table-of-contents)
  - [📦 Template contains](#-template-contains)
  - [💎 Pre-loaded dependencies](#-pre-loaded-dependencies)
  - [📝 Versions (Latest Version)](#-versions-latest-version)
  - [\[v1.2.0\] - `2026-03-05`](#v120---2026-03-05)
    - [Version History](#version-history)
  - [📌 Get Started](#-get-started)
    - [Want some more ?](#want-some-more-)

## 📦 Template contains

- [x] ReactJS v19.x
- [x] Next.js v16.x
- [x] TailwindCSS v4.x
- [x] Ant Design v5.x
- [x] Containerized with Docker (`node:24-alpine` image)
- [x] CI/CD supported (`Jenkins` & `SonarQube`)
- [x] A bunch of tools/library (e.g. `axios`, `dayjs`, `pino`, etc.)

## 💎 Pre-loaded dependencies

```bash
yarn add @ant-design/icons antd axios dayjs eslint eslint-config-next js-base64 js-cookie lodash pino react-loading-randomizable
yarn add --dev @testing-library/jest-dom @testing-library/react autoprefixer jest jest-environment-jsdom postcss tailwindcss
npx tailwindcss init -p
```

## 📝 Versions (Latest Version)

## [v1.2.0] - `2026-03-05`

- Removed unused Ant Design components from next.config.js
- Updated dependencies including major version upgrades for @ant-design packages and eslint
- Improved package management in yarn.lock

### Version History

... [more](./CHANGELOG.md)

## 📌 Get Started

1. Initialized (don't forget to rename `my-project`)

    ```bash
    npx degit owlsome-official/next-antd-tailwind#main my-project
    ```

2. Go to project folder

    ```bash
    cd my-project
    ```

3. Set up dependencies

    ```bash
    yarn
    ```

4. Run!

    ```bash
    yarn dev
    ```

### Want some more ?

see [Next.js Guide](https://nextjs.org/docs)

🌈 Next.js Template – Made with ❤️ by Watsize 🌈

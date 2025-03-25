# 🔺 next-antd-tailwind 🔺

## 📘 About

A boilerplate for Next.js integrated with Ant Design, tailwindcss and a lot of useful tools/library.

## 📝 Table of Contents

- [🔺 next-antd-tailwind 🔺](#-next-antd-tailwind-)
  - [📘 About](#-about)
  - [📝 Table of Contents](#-table-of-contents)
  - [📦 Template contains](#-template-contains)
  - [💎 Pre-loaded dependencies](#-pre-loaded-dependencies)
  - [📝 Versions (Last 2 Minor Version)](#-versions-last-2-minor-version)
    - [v0.5.1 - `2025-03-25`](#v051---2025-03-25)
    - [v0.5.0 - `2025-02-06`](#v050---2025-02-06)
    - [v0.4.2 - `2024-09-20`](#v042---2024-09-20)
    - [v0.4.1 - `2024-09-04`](#v041---2024-09-04)
    - [v0.4.0 - `2024-09-04`](#v040---2024-09-04)
    - [Version History](#version-history)
  - [📌 Get Started](#-get-started)
    - [Want some more ?](#want-some-more-)

## 📦 Template contains

- [x] ReactJS v19.0.x
- [x] Next.js v15.1.x
- [x] TailwindCSS v4.0.x
- [x] Ant Design v5.23.x
- [x] Containerized with Docker (`node:18-alpine` image)
- [x] CI/CD supported (`Jenkins` & `SonarQube`)
- [x] Helm command set for k8s
- [x] A bunch of tools/library (e.g. `axios`, `dayjs`, `pino`, etc.)

## 💎 Pre-loaded dependencies

```bash
yarn add @ant-design/icons antd axios dayjs eslint eslint-config-next js-base64 js-cookie lodash pino react-loading-randomizable
yarn add --dev @testing-library/jest-dom @testing-library/react autoprefixer jest jest-environment-jsdom postcss tailwindcss
npx tailwindcss init -p
```

## 📝 Versions (Last 2 Minor Version)

### v0.5.1 - `2025-03-25`

- Updated dependencies

### v0.5.0 - `2025-02-06`

- Upcoming: Next 15, React 19, tailwindCSS v4, eslint 9
- Updated dependencies
- Audit Fixed

### v0.4.2 - `2024-09-20`

- Fixed known vulnerabilities
- Updated dependencies

### v0.4.1 - `2024-09-04`

- Fixed known vulnerabilities via `npx yarn-audit-fix`

### v0.4.0 - `2024-09-04`

- Added supported cacheHandler with Redis for scalable infrastructure
- Added Prettier configuration files
- Updated dockerignore for lean

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

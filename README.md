# React Webpack SPA

一个使用 **React 19 + Webpack 5 + SWC** 搭建的单页应用（SPA）脚手架，内建 Tailwind/PostCSS、Jest、Cypress 以及 Biome/Husky，适合快速验证 Web3 或通用前端原型。

## 功能特性

- **现代编译链**：Webpack + SWC 提供快速构建；Tailwind 通过 PostCSS 驱动。
- **路由与布局**：React Router v7（BrowserRouter）+ Layout/Route 模块化配置。
- **状态管理示例**：内置 `useImmer` 自定义 Hook 及 Jotai store 示例。
- **质量保证**：Biome lint/format、Jest 单测、Cypress E2E、Husky pre-commit。
- **双协议兼容**：自定义 `basename`，直接双击 `dist/index.html`（file://）也能加载首页。

## 快速开始

```bash
npm install

# 开发模式
npm run client:dev

# 生产构建
npm run client:prod

# 单元测试 & E2E
npm run test        # Jest
npm run test:e2e    # Cypress

# 代码质量
npm run lint        # Biome lint
npm run format      # Biome format
```

> 提示：首次安装依赖后会执行 `npm run prepare` 初始化 Husky；如在非 git 环境，请手动运行。

## 目录结构

```
src/
 ├─ components/    # 公共 UI、Home 示例
 ├─ hooks/         # useImmer 等自定义 hooks
 ├─ layout/        # AppLayout + Header
 ├─ pages/         # App、Home、About 等页面
 ├─ routes/        # 集中式路由定义
 ├─ stores/        # Jotai/Immer demo store
 ├─ utils/types…   # 工具与类型
 └─ index.tsx      # 入口（BrowserRouter + basename 适配）
config/webpack.*   # dev/prod 配置
scripts/           # npm script 包装（client:dev 等）
tests/, cypress/   # 单测与端到端测试
```

## 构建说明

- `config/webpack.development.js` 指向 `dist` 目录输出，便于调试，同时启用 `historyApiFallback`。
- `config/webpack.production.js` 生成 `dist/index.html`，模板位于 `src/index-prod.html`，包含 `<div id="root">`。
- SWC 负责 TS/JS 转译；MiniCssExtractPlugin 抽取 CSS。

## Husky & Biome

- `.husky/pre-commit`：执行 `npm run lint` 防止问题代码进入仓库。
- `biome.json`：统一 lint/format 规则，可通过 `npm run lint:fix`、`npm run format:fix` 自动修复。

## 后续建议

1. 扩展 `pages/` + `routes/`，利用懒加载拆分包体。
2. 在 `tests/` 中补齐与实际页面匹配的用例，清理无效引用。
3. 根据业务引入状态管理方案（继续使用 Immer/Jotai 或 Redux Toolkit、Zustand 等）。

如需更多细节，可阅读 `src` 目录内注释或参考 `package.json` 脚本。欢迎在此基础上继续搭建 Web3/SPA 应用。

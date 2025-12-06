const path = require("path");

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  // 匹配所有单元测试文件
  testMatch: ["**/?(*.)(spec|test).ts?(x)"],
  rootDir: "",
  // 指定测试前需要执行的初始化脚本
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  // 使用 SWC 处理 TS/TSX
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },

  // 常用别名映射，便于测试中直接引用
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils$1",
  },
  // 全局覆盖率门槛
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  // 只运行一次测试，不常驻监听
  watchAll: false,
  // 开启覆盖率并输出到 docs 目录
  collectCoverage: true,
  coverageDirectory: "./docs/jest-coverage",
  // 忽略不需要扫描的路径（只排除 e2e）
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/tests/e2e/"],
  // 允许解析的模块后缀
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

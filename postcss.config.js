const tailwind = require("@tailwindcss/postcss");
// postcssPresetEnv 对项目内样式生效, 把未来的 CSS 语法转换成当前浏览器可用的写法
const postcssPresetEnv = require("postcss-preset-env");


module.exports = (ctx) => {
  // 当前被处理的 CSS 文件目录（可能为空）
  const source = ctx.file?.dirname || "";
  // 是否来自第三方依赖（node_modules）
  const isThirdParty = source.includes("node_modules");
  return {
    // 仅对项目内 CSS 启用 Tailwind；第三方样式不做处理
    plugins: isThirdParty ? [] : [tailwind, postcssPresetEnv],
  };
};

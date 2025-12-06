const HtmlWebpackPlugin = require("html-webpack-plugin");
const { join, resolve } = require("path");
const port = 3000;
module.exports = {
  mode: "development",
  output: {
    path: join(__dirname, "../dist"),
    publicPath: "auto",
    //如果是通过loader 编译的 放到scripts文件夹里 filename
    filename: "scripts/[name].bundle.js",
    //如果是通过'asset/resource' 编译的
    assetModuleFilename: "images/[name].[ext]",
  },
  devServer: {
    port,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: join(__dirname, "../dist"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../src/index-dev.html"),
      filename: "index.html",
    }),
  ],
};

const { resolve } = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = _mode === "production" ? true : false;

const _devConfig = require(`./config/webpack.${_mode}.js`);

const webpackConfig = {
  entry: {
    main: resolve(__dirname, "src/index.tsx"),
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "swc-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb 以下内联
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": resolve("src/"),
      "@components": resolve("src/components"),
      "@hooks": resolve("src/hooks"),
      "@pages": resolve("src/pages"),
      "@layouts": resolve("src/layouts"),
      "@routes": resolve("src/routes"),
      "@assets": resolve("src/assets"),
      "@stores": resolve("src/stores"),
      "@service": resolve("src/service"),
      "@utils": resolve("src/utils"),
      "@lib": resolve("src/lib"),
      "@constants": resolve("src/constants"),
      "@connections": resolve("src/connections"),
      "@abis": resolve("src/abis"),
      "@types": resolve("src/types"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx", ".css"],
    fallback: {
      // stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [
      new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      ignoreOrder: false,
    }),
  ],
};
module.exports = merge.default(webpackConfig, _devConfig);

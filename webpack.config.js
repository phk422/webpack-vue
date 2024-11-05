import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // 不适用默认的模式，完全自定义
  mode: "none",
  // experiments: {
  //   outputModule: true, // webpack 将尽可能输出 ECMAScript 模块语法
  // },
  entry: "./src/main.js",
  output: {
    // 打包钱清理输出目录
    clean: true,
    library: {
      type: "umd", // 不能使用module，无法进行HMR
    },
  },
  // sourceMap生成相关配置
  devtool: "inline-source-map",
  // 文件别名配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          reactivityTransform: true,
        },
      },
      {
        test: /\.css$|\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      scriptLoading: "module",
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new VueLoaderPlugin(),
    // 将css提取成单独的文件
    new MiniCssExtractPlugin(),
    // 文件复制
    new CopyPlugin({
      patterns: [{ from: "public/favicon.ico", to: "" }],
    }),
    // 打包进度美化
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
  ],
  // HMR未针对模块格式实现：https://github.com/webpack/webpack/issues/17636
  devServer: {
    static: "./dist",
    port: 4576,
    open: true,
  },
};

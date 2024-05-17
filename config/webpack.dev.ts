import { scriptRules, styleRules, pugRules } from "./rules";
import commonConfig from "./webpack.common";
import merge from "webpack-merge";
import { miniCssPlugin, multiHtmlPlugin, analyzerPlugin } from "./plugins";
import { WebpackConfiguration } from "webpack-dev-server";

export default merge(commonConfig, {
  mode: "development",
  module: {
    rules: [scriptRules, styleRules, pugRules],
  },
  plugins: [miniCssPlugin, ...multiHtmlPlugin, analyzerPlugin],
  devServer: {
    host: "localhost",
    port: 3000,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}) as WebpackConfiguration;

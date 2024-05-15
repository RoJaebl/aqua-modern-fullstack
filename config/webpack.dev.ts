import { commonRules } from "./rules";
import commonConfig from "./webpack.common";
import merge from "webpack-merge";
import { miniCss, multiHtml, analyzer } from "./plugins";
import { WebpackConfiguration } from "webpack-dev-server";

export default merge(commonConfig, {
  mode: "development",
  module: {
    rules: commonRules,
  },
  plugins: [miniCss, ...multiHtml, analyzer],
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

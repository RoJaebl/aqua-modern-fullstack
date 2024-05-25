import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import { miniCssPlugin } from "./plugins";
import { scriptRules, styleRules, pugRules } from "./rules";

module.exports = merge(commonConfig, {
  mode: "production",
  module: {
    rules: [scriptRules, styleRules, pugRules],
  },
  plugins: [miniCssPlugin],
});

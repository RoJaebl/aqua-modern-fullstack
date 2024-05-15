import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import { plugins } from "./plugins";
import { commonRules } from "./rules";

module.exports = merge(commonConfig, {
  mode: "production",
  module: {
    rules: commonRules,
  },
  plugins,
});

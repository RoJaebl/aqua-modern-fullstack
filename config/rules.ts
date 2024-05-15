import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const commonRules: ModuleOptions["rules"] = [
  {
    test: /\.[jt]s$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
      },
    },
  },
  {
    test: /\.(s[ac]|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "postcss-loader",
      "sass-loader",
    ],
  },
  {
    test: /\.pug$/,
    use: ["html-loader", "pug-loader"],
  },
];

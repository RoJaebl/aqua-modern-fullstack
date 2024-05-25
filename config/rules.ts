import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const pugRules = {
  test: /\.pug$/,
  use: ["html-loader", "pug-loader"],
};
export const styleRules = {
  test: /\.(s[ac]|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    "sass-loader",
  ],
};
export const scriptRules = {
  test: /\.[jt]sx?$/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    },
  },
};

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const htmlPages = [
  "base",
  "users/signin",
  "users/signup",
  "videos/home",
  "videos/edit",
  "videos/watch",
  "partials/footer",
  "partials/header",
  "partials/social-signin",
  "mixins/video",
];
const multiHtmlWebpackPlugin = htmlPages.map(
  (name) =>
    new HtmlWebpackPlugin({
      template: `./src/views/${name}.pug`,
      filename: `views/${name}.html`,
    })
);
export const multiHtmlPlugin = multiHtmlWebpackPlugin;

export const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "css/style.css",
});

export const analyzerPlugin = new BundleAnalyzerPlugin();

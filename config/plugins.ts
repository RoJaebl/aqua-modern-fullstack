import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const htmlPages: String[] = [
  "base",
  "home",
  "partials/footer",
  "partials/header",
];
const multiHtmlWebpackPlugin: HtmlWebpackPlugin[] = htmlPages.map(
  (name) =>
    new HtmlWebpackPlugin({
      template: `./src/views/${name}.pug`,
      filename: `views/${name}.html`,
    })
);
export const multiHtml = multiHtmlWebpackPlugin;

export const miniCss = new MiniCssExtractPlugin({
  filename: "css/style.css",
});

export const analyzer = new BundleAnalyzerPlugin();

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import "./pages";
import pages from "./pages";

const multiHtmlWebpackPlugin = pages.map(
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

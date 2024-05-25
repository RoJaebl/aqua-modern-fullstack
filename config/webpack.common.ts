import { Configuration } from "webpack";
import path from "path";
import "./scripts";
import scripts from "./scripts";

const commonConfig: Configuration = {
  entry: scripts,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "public"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
};
export default commonConfig;

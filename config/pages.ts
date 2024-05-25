import path from "path";
import broadCast from "./shared";

let pages: string[] = [];
broadCast(
  path.join(__dirname, "..", "src/views"),
  /\.pug$/,
  (filename) => (pages = [...pages, filename.replace(".pug", "")])
);

export default pages;

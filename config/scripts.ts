import path from "path";
import broadCast from "./shared";

let scripts = {};
broadCast(
  path.join(__dirname, "..", "./src/client"),
  /\.ts$/,
  (filename) =>
    (scripts = {
      ...scripts,
      [filename.replace(".ts", "")]: path.resolve("./src/client", filename),
    })
);

export default scripts;

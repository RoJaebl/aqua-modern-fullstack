import fs from "fs";
import path from "path";

const viewsPath = path.join(__dirname, "..", "src/views");
const pages = [] as string[];

const broadCastFile = (pathName: string = "", dirs: string[]) => {
  for (let i = 0; i < dirs.length; i++) {
    const filename = path.join(pathName, dirs[i]);
    if (/(^\w+)$/.test(dirs[i])) {
      broadCastFile(filename, fs.readdirSync(path.join(viewsPath, filename)));
      continue;
    }
    if (/\.pug$/.test(dirs[i])) {
      pages.push(filename.replace(".pug", ""));
    }
  }
};

broadCastFile("", fs.readdirSync(viewsPath));

export default pages;

import fs from "fs";
import path from "path";

export interface IBroadCast<T> {
  (basePath: string, ext: RegExp, callback: (filename: string) => T): T;
}

export default function broadCast<T>(
  basePath: string,
  ext: RegExp,
  callback: (filename: string) => T
) {
  let content: T;

  const broadCastFile = (pathName: string = "", dirs: string[]) => {
    for (let i = 0; i < dirs.length; i++) {
      const filename = path.join(pathName, dirs[i]);

      if (/(^\w+)$/.test(dirs[i])) {
        broadCastFile(filename, fs.readdirSync(path.join(basePath, filename)));
        continue;
      }
      if (ext.test(dirs[i])) {
        content = callback(filename);
      }
    }
  };

  broadCastFile("", fs.readdirSync(basePath));
}

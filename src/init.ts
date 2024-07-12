import "dotenv/config.js";
import "./db";
import app from "./server";
import path from "path";
import https, { ServerOptions } from "https";
import http from "http";
import fs from "fs";

const isDev = process.env.NODE_ENV === "development";
const PORT = isDev ? process.env.PORT! : "4040";

const listenPrint = (isDev: boolean, port: string) =>
  console.log(
    `✅ Server listenting on port http${
      (!isDev && "s") || ""
    }://localhost:${port} 🚀`
  );
const ncryptPath = "/etc/letsencrypt/live/bridge.lookfitall.com";
const ncryptOption: ServerOptions = {
  key: fs.readFileSync(path.join(ncryptPath, "privkey.pem"), "utf8"),
  cert: fs.readFileSync(path.join(ncryptPath, "cert.pem"), "utf8"),
  ca: fs.readFileSync(path.join(ncryptPath, "chain.pem"), "utf8"),
};
http.createServer(app).listen("4000", () => listenPrint(true, "4000"));
!isDev &&
  https
    .createServer(ncryptOption, app)
    .listen(PORT, () => listenPrint(isDev, PORT));

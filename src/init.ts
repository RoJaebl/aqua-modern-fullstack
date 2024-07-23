import "dotenv/config.js";
import "./db";
import app from "./server";
import http from "http";

const isDev = process.env.NODE_ENV === "development";
const PORT = isDev ? process.env.PORT! : "4000";

const listenPrint = (isDev: boolean, port: string) =>
  console.log(
    `✅ Server listenting on port http${
      "" // (!isDev && "s") || ""
    }://localhost:${port} 🚀`
  );
http.createServer(app).listen(PORT, () => listenPrint(true, PORT));

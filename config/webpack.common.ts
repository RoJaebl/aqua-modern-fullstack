import { Configuration } from "webpack";
import path from "path";

const BASE_PATH = "./src/client";
const APP_PATH = path.resolve(BASE_PATH, "app");
const PAGES_PATH = path.resolve(BASE_PATH, "pages");
const USERS_PATH = path.resolve(PAGES_PATH, "users");
const VIDEOS_PATH = path.resolve(PAGES_PATH, "videos");
const WIDGETS_PATH = path.resolve(BASE_PATH, "widgets");

const commonConfig: Configuration = {
  entry: {
    "app/main": path.join(APP_PATH, "/main.ts"),
    "pages/users/user": path.join(USERS_PATH, "/user.ts"),
    "pages/videos/video": path.join(VIDEOS_PATH, "/video.ts"),
  },
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

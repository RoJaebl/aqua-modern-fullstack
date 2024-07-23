import mongoose from "mongoose";
const isDev = process.env.NODE_ENV === "development";
mongoose.connect(isDev ? process.env.DB_URL! : process.env.DB_URL_DEPLOY!);
import "./models/user.model";
import "./models/video.model";
import "./models/comment.model";

const db = mongoose.connection;

db.on("error", (err) => console.log("❌ DB Error: ", err));
db.once("open", () => console.log("✅ Connected to DB"));

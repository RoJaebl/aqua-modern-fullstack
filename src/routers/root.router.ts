import express from "express";
import { home } from "../controllers/video.controller";
import { postSignup, signin, signup } from "../controllers/user.controller";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/signup").get(signup).post(postSignup);
rootRouter.route("/signin").get(signin);

export default rootRouter;

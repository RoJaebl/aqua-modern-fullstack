import express from "express";
import { home } from "../controllers/video.controller";
import {
  ghSignin,
  ghSigninAccess,
  postSignin,
  postSignup,
  signin,
  signup,
} from "../controllers/user.controller";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/signup").get(signup).post(postSignup);
rootRouter.route("/signin").get(signin).post(postSignin);
rootRouter.route("/signin/oauth/github").get(ghSignin);
rootRouter.route("/signin/oauth/github/access").get(ghSigninAccess);
export default rootRouter;

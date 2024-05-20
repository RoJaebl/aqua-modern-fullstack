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
import { restrictMiddleware } from "../middlewares/gaurd.middlware";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter
  .route("/signup")
  .all(restrictMiddleware)
  .get(signup)
  .post(postSignup);
rootRouter
  .route("/signin")
  .all(restrictMiddleware)
  .get(signin)
  .post(postSignin);
rootRouter.route("/signin/oauth/github").all(restrictMiddleware).get(ghSignin);
rootRouter
  .route("/signin/oauth/github/access")
  .all(restrictMiddleware)
  .get(ghSigninAccess);
export default rootRouter;

import express from "express";
import {
  ghSignin,
  ghSigninAccess,
  profile,
  signout,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/signout").get(signout);
userRouter.route("/github/oauth/signin").get(ghSignin);
userRouter.route("/github/oauth/signin/access").get(ghSigninAccess);
userRouter.route("/:id").get(profile);

export default userRouter;

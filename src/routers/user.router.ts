import express from "express";
import {
  userSummary,
  signout,
  userProfile,
  postUserProfile,
} from "../controllers/user.controller";
import { avatarUpload } from "../middlewares/multer.middleware";
import { authorizeMiddleware } from "../middlewares/gaurd.middlware";

const userRouter = express.Router();

userRouter.route("/signout").all(authorizeMiddleware).get(signout);
userRouter
  .route("/:id/profile")
  .all(authorizeMiddleware)
  .get(userProfile)
  .post(avatarUpload.single("avatar"), postUserProfile);
userRouter.route("/:id").get(userSummary);

export default userRouter;

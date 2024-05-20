import express from "express";
import {
  userSummary,
  signout,
  userProfile,
  postUserProfile,
} from "../controllers/user.controller";
import { avatarUpload } from "../middlewares/multer.middleware";

const userRouter = express.Router();

userRouter.route("/signout").get(signout);
userRouter
  .route("/:id/profile")
  .get(userProfile)
  .post(avatarUpload.single("avatar"), postUserProfile);
userRouter.route("/:id").get(userSummary);

export default userRouter;

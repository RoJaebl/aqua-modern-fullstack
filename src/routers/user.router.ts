import express from "express";
import {
  signout,
  summary,
  postProfile,
  changePassword,
  postChangePassword,
  profile,
} from "../controllers/user.controller";
import { avatarUpload } from "../middlewares/multer.middleware";
import {
  authorizeMiddleware,
  guardMiddleware,
  paramMiddleware,
  socialOnlyMiddleware,
} from "../middlewares/gaurd.middlware";

const userRouter = express.Router();

userRouter.route("/signout").all(authorizeMiddleware).get(signout);
userRouter
  .route("/profile")
  .all(authorizeMiddleware, guardMiddleware)
  .get(profile)
  .post(avatarUpload.single("avatar"), postProfile);
userRouter
  .route("/change-password")
  .all(authorizeMiddleware, socialOnlyMiddleware, guardMiddleware)
  .get(changePassword)
  .post(postChangePassword);
userRouter
  .route("/:id([0-9a-z]{24})")
  .all(
    paramMiddleware("user", {
      path: "videos",
      populate: {
        path: "owner",
        model: "User",
      },
    })
  )
  .get(summary);

export default userRouter;

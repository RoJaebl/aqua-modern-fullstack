import express from "express";
import { profile, signout } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/signout").get(signout);
userRouter.route("/:id").get(profile);

export default userRouter;

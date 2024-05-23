import express from "express";
import {
  edit,
  postUpload,
  upload,
  watch,
} from "../controllers/video.controller";
import { videoUpload } from "../middlewares/multer.middleware";
import { guardMiddleware } from "../middlewares/gaurd.middlware";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(guardMiddleware)
  .get(upload)
  .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload);
videoRouter.route("/:id").get(watch);
videoRouter.route("/:id/edit").get(edit);
// videoRouter.route("/:id([0-9a-f]{24})").get(watch);

export default videoRouter;

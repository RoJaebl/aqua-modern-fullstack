import express from "express";
import {
  edit,
  postEdit,
  postUpload,
  upload,
  watch,
} from "../controllers/video.controller";
import { videoUpload } from "../middlewares/multer.middleware";
import {
  guardMiddleware,
  paramMiddleware,
  videoAuthorizeMiddleware,
  videoValidateMiddleware,
} from "../middlewares/gaurd.middlware";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(guardMiddleware)
  .get(upload)
  .post(
    videoUpload.fields([{ name: "video" }, { name: "thumb" }]),
    videoValidateMiddleware("videos/upload"),
    postUpload
  );
videoRouter
  .route("/:id([0-9a-f]{24})")
  .all(paramMiddleware("video"))
  .get(watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(paramMiddleware("video"), videoAuthorizeMiddleware)
  .get(edit)
  .post(videoValidateMiddleware("videos/edit"), postEdit);

export default videoRouter;

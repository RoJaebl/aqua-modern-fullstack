import express from "express";
import {
  postComment,
  postView,
  removeComment,
} from "../controllers/video.controller";
import {
  commentAuthorizeMiddleware,
  guardMiddleware,
  paramMiddleware,
} from "../middlewares/gaurd.middlware";

const apiRouter = express.Router();

apiRouter
  .route("/videos/:id([0-9a-f]{24})/views")
  .all(paramMiddleware("video"))
  .post(postView);
apiRouter
  .route("/videos/:id([0-9a-f]{24})/comment")
  .all(guardMiddleware, paramMiddleware("video"))
  .post(postComment)
  .delete(commentAuthorizeMiddleware, removeComment);

export default apiRouter;

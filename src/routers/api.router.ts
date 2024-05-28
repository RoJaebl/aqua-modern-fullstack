import express from "express";
import { registerView } from "../controllers/video.controller";
import { paramMiddleware } from "../middlewares/gaurd.middlware";

const apiRouter = express.Router();

apiRouter
  .route("/videos/:id([0-9a-f]{24})/views")
  .all(paramMiddleware("video"))
  .post(registerView);

export default apiRouter;

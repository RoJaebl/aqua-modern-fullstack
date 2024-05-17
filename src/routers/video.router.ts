import express from "express";
import { edit, watch } from "../controllers/video.controller";

const videoRouter = express.Router();

videoRouter.route("/:id").get(watch);
videoRouter.route("/:id/edit").get(edit);
// videoRouter.route("/:id([0-9a-f]{24})").get(watch);

export default videoRouter;

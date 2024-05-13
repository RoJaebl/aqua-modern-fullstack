import express from "express";
import { watch } from "../controllers/video.controller";

const videoRouter = express.Router();

videoRouter.route("/:id([0-9a-f]{24})").get(watch);

export default videoRouter;

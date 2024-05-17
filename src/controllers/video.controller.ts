import { RequestHandler } from "express";
import { AppResponse, VideoModel } from "../shared/types";

let videos: VideoModel[] = [
  {
    title: "video1",
    id: 1,
    description: "dfasdf",
    hashtags: "asdf, dasf, asdf",
  },
  {
    title: "video2",
    id: 2,
    description: "dfasdf",
    hashtags: "asdf, dasf, asdf",
  },
  {
    title: "video3",
    id: 3,
    description: "dfasdf",
    hashtags: "asdf, dasf, asdf",
  },
];

export const home: RequestHandler = (req, res) => {
  Object.assign((res as AppResponse).locals, {
    pageTitle: "Home",
    videos,
  });
  return res.render("videos/home");
};
export const watch: RequestHandler = (req, res) => {
  const {
    params: { id: videoId },
  } = req;
  (res as AppResponse).locals.pageTitle = "Watch";
  return res.render("videos/watch");
};

export const edit: RequestHandler = (req, res) => {
  (res as AppResponse).locals.pageTitle = "Edit";
  return res.render("videos/edit");
};

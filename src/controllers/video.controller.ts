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
  const { locals } = res as AppResponse;
  locals.pageTitle = "Home";
  locals.videos = videos;
  return res.render("videos/home");
};
export const watch: RequestHandler = (req, res) => {};

export const edit: RequestHandler = (req, res) => {
  (res as AppResponse).locals.pageTitle = "Edit";
  return res.render("videos/edit");
};

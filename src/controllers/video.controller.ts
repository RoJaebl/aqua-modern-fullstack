import { RequestHandler } from "express";

export let videos = [
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
  const { locals } = res;
  locals.pageTitle = "Home";
  locals.videos = videos;
  return res.render("videos/home");
};
export const watch: RequestHandler = (req, res) => {};

export const edit: RequestHandler = (req, res) => {
  res.locals.pageTitle = "Video Edit";
  return res.render("videos/edit");
};
export const upload: RequestHandler = (req, res) => {
  res.locals.pageTitle = "Video Upload";
  return res.render("videos/upload");
};

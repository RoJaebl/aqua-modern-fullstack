import { RequestHandler } from "express";
import Video from "../models/video.model";

export const home: RequestHandler = async (req, res) => {
  const { locals } = res;
  locals.pageTitle = "Home";
  locals.videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("videos/home");
};
export const watch: RequestHandler = (req, res) => {};

export const edit: RequestHandler = (req, res) => {
  const { locals } = res;
  locals.pageTitle = "Video Edit";
  return res.render("videos/edit");
};
export const upload: RequestHandler = (req, res) => {
  const { locals } = res;
  locals.pageTitle = "Video Upload";
  return res.render("videos/upload");
};
export const postUpload: RequestHandler = async (req, res) => {
  const { locals } = res;
  const {
    body: { title, description, hashtags },
    files: { video, thumb } = {},
    user,
  } = req;
  locals.pageTitle = "Video Upload";
  const fileUrl = video[0].path;
  const thumbUrl = thumb[0].path;
  if (80 < title.length || description.length < 20) {
    locals.error = {
      ...(80 < title.length && { title: "제목을 80자 이하로 작성하세요." }),
      ...(description.length < 20 && {
        description: "설명을 20자 초과하여 작성하세요.",
      }),
    };
    return res.status(400).render("videos/upload");
  }

  try {
    const newVidoe = await Video.create({
      title,
      fileUrl,
      description,
      thumbUrl,
      hashtags,
      owner: user!.id,
    });
    user!.videos.push(newVidoe.id);
    user!.save();

    return res.redirect("/");
  } catch {
    locals.error = {
      message: "비디오 생성에 실패하였습니다.",
    };
    return res.status(400).render("videos/upload");
  }
};

import { RequestHandler } from "express";
import Video from "../models/video.model";
import User from "../models/user.model";

export const home: RequestHandler = async (_, res) => {
  const { locals } = res;
  locals.pageTitle = "Home";
  locals.videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("videos/home");
};
export const upload: RequestHandler = (_, res) => {
  const { locals } = res;
  locals.pageTitle = "Video Upload";
  return res.render("videos/upload");
};
export const postUpload: RequestHandler = async (req, res) => {
  const { locals } = res;
  const {
    body: { title, description, hashtags },
    user,
  } = req;
  const { video, thumb } = req.files!;
  locals.pageTitle = "Video Upload";
  const fileUrl = video[0].path;
  const thumbUrl = thumb[0].path;

  try {
    const newVidoe = await Video.create({
      title,
      fileUrl,
      description,
      thumbUrl,
      hashtags: Video.formatHashtags(hashtags),
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
export const watch: RequestHandler = async (req, res) => {
  const { locals } = res;
  locals.video = req.video;
  locals.pageTitle = locals.video.title;
  return res.render("videos/watch");
};
export const edit: RequestHandler = (_, res) => {
  const { locals } = res;
  locals.pageTitle = "Video Edit";
  return res.render("videos/edit");
};
export const postEdit: RequestHandler = async (req, res) => {
  const {
    video,
    body: { title, description, hashtags },
  } = req;
  await Video.findByIdAndUpdate(video!.id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${video!.id}`);
};

export const remove: RequestHandler = async (req, res) => {
  const { _id, videos } = req.video.owner;
  videos.splice(videos.indexOf(_id), 1);
  await User.findByIdAndUpdate(_id, { videos });
  await Video.findByIdAndDelete(req.video?._id);
  return res.redirect("/");
};

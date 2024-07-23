import { RequestHandler } from "express";
import Video from "../models/video.model";
import User, { IUserDocument } from "../models/user.model";
import fs from "fs";
import Comment from "../models/comment.model";
import { TDocument } from "../shared/types";
import { removeFile } from "../middlewares/multer.middleware";

const isDev = process.env.NODE_ENV === "development";

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
    files,
  } = req;
  locals.pageTitle = "Video Upload";
  const fileUrls = Object.entries(files!).reduce((acc, cur) => {
    const propName = { video: "fileUrl", thumb: "thumbUrl" }[cur[0]]!;
    return Object.assign(acc, {
      [propName]: cur[1][0][isDev ? "path" : "location"],
    });
  }, {});
  try {
    const newVidoe = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: user.id,
      comments: [],
      ...fileUrls,
    });
    user.videos.push(newVidoe.id);
    user.save();
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
  locals.pageTitle = locals.video?.title;
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
  const { _id: videoId, owner, fileUrl, thumbUrl } = req.video;
  const { _id: userId, videos } = owner as TDocument<IUserDocument>;
  isDev ? fs.rmSync(fileUrl) : await removeFile(fileUrl);
  isDev ? fs.rmSync(thumbUrl) : await removeFile(thumbUrl);

  videos.splice(videos.indexOf(videoId), 1);
  await Video.findByIdAndDelete(videoId);
  await User.findByIdAndUpdate(userId, { videos });
  return res.redirect("/");
};
export const search: RequestHandler = async (req, res) => {
  const { keyword } = req.query;
  const { locals } = res;
  locals.pageTitle = "Video Search";
  locals.videos = [];
  keyword &&
    locals.videos.push(
      ...(await Video.find({
        title: {
          $regex: new RegExp(`${keyword}`, "i"),
        },
      }).populate("owner"))
    );
  return res.render("search");
};
export const postView: RequestHandler = async (req, res) => {
  req.video.meta.views += 1;
  await req.video.save();
  return res.sendStatus(200);
};
export const postComment: RequestHandler = async (req, res) => {
  const { user, video, body } = req;
  const { _id: videoId, comments: videoComments } = video;
  const { _id: userId, comments: userComments } = user;

  const newComment = await Comment.create({
    text: body.text,
    owner: userId,
    video: videoId,
  });

  videoComments.push(newComment.id);
  await video.save();
  userComments.push(newComment.id);
  await user.save();
  return res.status(201).json({ id: newComment.id });
};
export const removeComment: RequestHandler = async (req, res) => {
  const { user, video, comment } = req;

  video.comments.splice(video.comments.indexOf(comment._id), 1);
  await video.save();
  user.comments.splice(user.comments.indexOf(comment._id), 1);
  await user.save();
  await Comment.findByIdAndDelete(comment._id);
  return res.sendStatus(201);
};

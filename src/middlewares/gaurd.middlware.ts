import { RequestHandler } from "express";
import User, { IUserDocument } from "../models/user.model";
import Video from "../models/video.model";
import { Response, TPopulatePath, TDocument } from "../shared/types";
import { Model, Types } from "mongoose";
import Comment from "../models/comment.model";

export const authorizeMiddleware: RequestHandler = (req, res, next) => {
  !req.session.user && req.flash("authority", "로그인을 하세요.");
  !req.session.user ? res.redirect("/signin") : next();
};

export const restrictMiddleware: RequestHandler = (req, res, next) => {
  req.session.user && req.flash("authority", "로그아웃 하세요.");
  req.session.user ? res.redirect("/") : next();
};

const $404 = (res: Response, message: string) => {
  res.locals.pageTitle = "404";
  res.locals.error = { page: message };
  return res.status(404).render("404");
};
const getDocumentById = async <T>({
  model,
  id,
  populatePath,
}: {
  model: Model<T>;
  id: Types.ObjectId | unknown;
  populatePath?: TPopulatePath;
}) => {
  const document = (await model.findById(id)) as TDocument<T>;
  if (!document) throw "";
  if (!populatePath) return document;
  return await document.populate(populatePath);
};

export const guardMiddleware: RequestHandler = async (req, res, next) => {
  try {
    req.user = await getDocumentById({
      model: User,
      id: req.session.user?._id,
    });
  } catch {
    const message = "사용자를 찾을 수 없습니다.";
    req.flash("404", message);
    return $404(res, message);
  }
  next();
};

export const paramMiddleware = (
  target: "video" | "user",
  populatePath?: TPopulatePath
) => {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      const model = { video: Video, user: User }[target] as Model<any>;
      req[target] = await getDocumentById({
        model,
        id: req.params.id,
        populatePath,
      });
    } catch {
      const message =
        target === "video"
          ? "비디오를 찾을 수 없습니다."
          : "사용자를 찾을 수 없습니다.";
      req.flash("404", message);
      return $404(res, message);
    }
    next();
  };
  return handler;
};

export const socialOnlyMiddleware: RequestHandler = (req, res, next) =>
  req.session.user?.socialOnly ? res.redirect("/") : next();

export const videoAuthorizeMiddleware: RequestHandler = (req, res, next) => {
  const { _id } = req.video.owner as TDocument<IUserDocument>;
  String(_id ?? req.video.owner) !== String(req.session.user?._id)
    ? res.status(403).redirect("/")
    : next();
};
export const commentAuthorizeMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const {
    body: { id },
  } = req;
  req.comment = await getDocumentById({ model: Comment, id });
  String(req.comment.owner) !== String(req.session.user?._id)
    ? res.status(403).redirect("/")
    : next();
};

export const videoValidateMiddleware = (view: string) => {
  const handler: RequestHandler = (req, res, next) => {
    const {
      body: { title, description },
    } = req;
    if (80 < title.length || description.length < 20) {
      res.locals.error = {
        ...(80 < title.length && { title: "제목을 80자 이하로 작성하세요." }),
        ...(description.length < 20 && {
          description: "설명을 20자 초과하여 작성하세요.",
        }),
      };
      return res.status(400).render(view);
    }
    next();
  };
  return handler;
};

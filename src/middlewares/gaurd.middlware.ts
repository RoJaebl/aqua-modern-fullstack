import { RequestHandler, Response } from "express";
import User from "../models/user.model";
import Video from "../models/video.model";

export const authorizeMiddleware: RequestHandler = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/signin");
  }
  next();
};

export const restrictMiddleware: RequestHandler = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
};

const $404 = (res: Response, message: string) => {
  res.locals.pageTitle = "404";
  res.locals.error = {
    page: message,
  };
  return res.status(404);
};

export const guardMiddleware: RequestHandler = async (req, res, next) => {
  const {
    session: { user: { _id } = {} },
  } = req;
  const message = "사용자가 존제하지 않습니다.";
  try {
    req.user = await User.findById(_id);
    if (!req.user) throw "";
    next();
  } catch {
    return $404(res, message!).render("404");
  }
};

export const paramMiddleware = (target: string) => {
  const handler: RequestHandler = async (req, res, next) => {
    const {
      params: { id },
    } = req;
    let message: string;
    try {
      if (/video/.test(target)) {
        message = "비디오가 존제하지 않습니다.";
        req.video = await Video.findById(id);
        if (!req.video) throw "";
      } else if (/user/.test(target)) {
        message = "사용자가 존제하지 않습니다.";
        req.user = await User.findById(id);
        if (!req.user) throw "";
      }
      next();
    } catch {
      return $404(res, message!).render("404");
    }
  };
  return handler;
};

export const socialOnlyMiddleware: RequestHandler = (req, res, next) => {
  if (req.session.user?.socialOnly) {
    return res.redirect("/");
  }
  next();
};

export const videoAuthorizeMiddleware: RequestHandler = (req, res, next) => {
  const {
    video,
    session: { user },
  } = req;

  if (String(video?.owner) !== String(user?._id)) {
    return res.status(403).redirect("/");
  }
  next();
};

export const videoValidateMiddleware = (view: string) => {
  const handler: RequestHandler = (req, res, next) => {
    const { locals } = res;
    const {
      body: { title, description },
    } = req;
    if (80 < title.length || description.length < 20) {
      locals.error = {
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

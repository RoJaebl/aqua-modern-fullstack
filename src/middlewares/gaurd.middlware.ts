import { RequestHandler } from "express";
import User from "../models/user.model";

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

export const guardMiddleware: RequestHandler = async (req, res, next) => {
  const {
    session: { user: { _id } = {} },
  } = req;
  const { locals } = res;
  req.user = await User.findById(_id);
  if (!req.user) {
    locals.error = {
      ...(!req.user && { page: "사용자가 존제하지 않습니다." }),
    };
    return res.status(404).render("404");
  }

  next();
};

export const socialOnlyMiddleware: RequestHandler = (req, res, next) => {
  if (req.session.user?.socialOnly) {
    return res.redirect("/");
  }
  next();
};

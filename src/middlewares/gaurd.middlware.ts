import { RequestHandler } from "express";

export const authorizeMiddleware: RequestHandler = (req, res, next) => {
  const {
    session: { user },
  } = req;
  if (user) {
    next();
  } else {
    return res.redirect("/signin");
  }
};

export const restrictMiddleware: RequestHandler = (req, res, next) => {
  const {
    session: { user },
  } = req;
  if (!user) {
    next();
  } else {
    return res.redirect("/");
  }
};

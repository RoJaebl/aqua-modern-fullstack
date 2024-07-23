import { RequestHandler } from "express";

const localsMiddleware: RequestHandler = (req, res, next) => {
  const { locals } = res;
  const {
    session: { loggedIn, user = {} },
  } = req;
  Object.assign(locals, {
    siteName: "Aqua Modern Fullstack",
    loggedIn,
    user,
    isDev: process.env.NODE_ENV === "development",
  });

  next();
};

export default localsMiddleware;

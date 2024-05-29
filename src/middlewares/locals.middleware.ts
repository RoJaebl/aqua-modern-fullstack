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
  });

  next();
};

export default localsMiddleware;

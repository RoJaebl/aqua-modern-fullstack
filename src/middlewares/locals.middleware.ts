import { RequestHandler } from "express";

const localsMiddleware: RequestHandler = (req, res, next) => {
  const { locals } = res;
  const {
    session: { loggedIn, user },
  } = req;
  Object.assign(locals, {
    siteName: "Aqua Modern Fullstack",
    loggedIn,
    user,
  });

  delete locals.formData;
  delete locals.error;
  next();
};

export default localsMiddleware;

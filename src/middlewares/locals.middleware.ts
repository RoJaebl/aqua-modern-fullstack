import { RequestHandler } from "express";
import { AppRequest, AppResponse } from "../shared/types";

const localsMiddleware: RequestHandler = (req, res, next) => {
  const { locals } = res as AppResponse;
  const {
    session: { loggedIn, user },
  } = req as AppRequest;
  locals.siteName = "Aqua Modern Fullstack";
  locals.loggedIn = Boolean(loggedIn);
  locals.user = user;

  delete locals.formData;
  delete locals.error;
  next();
};

export default localsMiddleware;

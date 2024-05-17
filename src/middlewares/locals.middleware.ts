import { RequestHandler } from "express";
import { AppResponse } from "../shared/types";

const localsMiddleware: RequestHandler = (req, res, next) => {
  const { locals } = res as AppResponse;
  locals.siteName = "Aqua Modern Fullstack";
  delete locals.formData;
  delete locals.error;

  next();
};

export default localsMiddleware;

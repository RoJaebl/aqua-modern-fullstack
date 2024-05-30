import { RequestHandler } from "express";

export const notFoundMiddleware: RequestHandler = (req, res, next) => {
  const { locals } = res;
  const message = "페이지를 찾을 수 없습니다.";
  locals.error = {
    page: message,
  };
  req.flash("404", message);
  return res.status(404).render("404");
};

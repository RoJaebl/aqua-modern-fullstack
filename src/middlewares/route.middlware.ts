import { RequestHandler } from "express";

export const notFoundMiddleware: RequestHandler = (req, res, next) => {
  const { locals } = res;
  locals.error = {
    page: "페이지를 찾을 수 없습니다.",
  };
  return res.status(404).render("404");
};

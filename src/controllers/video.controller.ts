import { RequestHandler } from "express";
import { AppResponse } from "../shared/types";

export const home: RequestHandler = (req, res) => {
  (res as AppResponse).locals.pageTitle = "Home";
  const df = "";
  return res.render("home");
};
export const watch: RequestHandler = (req, res) => {};

import { RequestHandler } from "express";
import { AppResponse } from "../shared/types";
import User from "../models/user.model";

export const signin: RequestHandler = (req, res) => {
  return res.render("users/signin");
};
export const signup: RequestHandler = (req, res) => {
  Object.assign((res as AppResponse).locals, {
    pageTitle: "Sign up",
  });
  return res.render("users/signup");
};
export const postSignup: RequestHandler = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  (res as AppResponse).locals.pageTitle = "Sign up";
  (res as AppResponse).locals.formData = { name, email, username, location };
  const isUser = await User.exists({ $or: [{ username }, { email }] });

  if (isUser) {
    (res as AppResponse).locals.error = {
      user: "이름이나 이메일 중 이미 존제합니다.",
    };
    delete res.locals.formData?.username;
    delete res.locals.formData?.email;
    return res.status(400).render("users/signup");
  }
  if (password !== password2) {
    (res as AppResponse).locals.error = {
      password: "비밀번호가 서로 일치하지 않습니다.",
    };
    return res.status(400).render("users/signup");
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
      avatarUrl: "",
      videos: [],
    });
    return res.redirect("/signin");
  } catch (err) {
    (res as AppResponse).locals.error = {
      message: "계정 생성에 실패하였습니다.",
    };
    return res.status(400).render("users/signup");
  }
};
export const signout: RequestHandler = (req, res) => {};
export const profile: RequestHandler = (req, res) => {};

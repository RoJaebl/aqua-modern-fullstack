import { RequestHandler } from "express";
import { AppRequest, AppResponse } from "../shared/types";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const signin: RequestHandler = (req, res) => {
  const { locals } = res as AppResponse;
  locals.pageTitle = "Sign in";
  return res.render("users/signin");
};
export const postSignin: RequestHandler = async (req, res) => {
  const { locals } = res as AppResponse;
  const { session } = req as AppRequest;

  locals.pageTitle = "Sign in";
  const { username, password } = req.body;

  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    locals.error = {
      user: "사용자가 존제하지 않습니다.",
    };
    return res.status(400).render("users/signin");
  }
  if (!bcrypt.compare(password, user.password)) {
    locals.error = {
      user: "사용자 비밀번호가 맞지 않습니다.",
    };
    return res.status(400).render("users/signin");
  }
  session.loggedIn = true;
  session.user = user;
  return res.redirect("/");
};
export const signup: RequestHandler = (req, res) => {
  const { locals } = res as AppResponse;
  locals.pageTitle = "Sign up";
  return res.render("users/signup");
};
export const postSignup: RequestHandler = async (req, res) => {
  const { locals } = res as AppResponse;
  locals.pageTitle = "Sign up";
  const { name, email, username, password, password2, location } = req.body;
  locals.formData = { name, email, username, location };

  const isUser = await User.exists({ $or: [{ username }, { email }] });
  if (isUser) {
    locals.error = {
      user: "이름이나 이메일 중 이미 존제합니다.",
    };
    delete locals.formData?.username;
    delete locals.formData?.email;
    return res.status(400).render("users/signup");
  }
  if (password !== password2) {
    locals.error = {
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
    locals.error = {
      message: "계정 생성에 실패하였습니다.",
    };
    return res.status(400).render("users/signup");
  }
};
export const signout: RequestHandler = (req, res) => {};
export const profile: RequestHandler = (req, res) => {};

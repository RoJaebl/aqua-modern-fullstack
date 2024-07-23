import { RequestHandler } from "express";
import { TGHEmails } from "../shared/types";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { URLSearchParams } from "url";
import fs from "fs";
import { removeFile } from "../middlewares/multer.middleware";

const isDev = process.env.NODE_ENV === "development";

export const signin: RequestHandler = (_, res) => {
  const { locals } = res;
  locals.pageTitle = "Sign in";
  return res.render("users/signin");
};
export const postSignin: RequestHandler = async (req, res) => {
  const { locals } = res;
  const {
    session,
    body: { username, password },
  } = req;
  locals.pageTitle = "Sign in";

  const user = await User.findOne({
    username,
    socialOnly: false,
  });
  const isCompare =
    user && (await bcrypt.compare(password, user.password ?? ""));
  if (!user || !isCompare) {
    locals.error = {
      ...(!user && { user: "사용자가 존제하지 않습니다." }),
      ...(!isCompare && user && { user: "사용자 비밀번호가 맞지 않습니다." }),
    };
    return res.status(400).render("users/signin");
  }

  session.loggedIn = true;
  session.user = user;
  return res.redirect("/");
};
export const signup: RequestHandler = (_, res) => {
  const { locals } = res;
  locals.pageTitle = "Sign up";
  return res.render("users/signup");
};
export const postSignup: RequestHandler = async (req, res) => {
  const { locals } = res;
  const { name, email, username, password, password2, location } = req.body;
  locals.pageTitle = "Sign up";
  locals.formData = { name, email, username, location };

  const isUser = await User.exists({ $or: [{ username }, { email }] });
  if (isUser || password !== password2) {
    locals.error = {
      ...(password !== password2 && {
        password: "비밀번호가 서로 일치하지 않습니다.",
      }),
      ...(isUser && { user: "이름이나 이메일 중 이미 존제합니다." }),
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
      comments: [],
    });
    return res.redirect("/signin");
  } catch {
    locals.error = {
      message: "계정 생성에 실패하였습니다.",
    };
    return res.status(400).render("users/signup");
  }
};
export const signout: RequestHandler = (req, res) => {
  req.session.destroy(() => {});
  return res.redirect("/");
};
export const ghSignin: RequestHandler = (_, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: process.env.GH_OAUTH_ID!,
    allow_signup: "false",
    scope: "read:user user:email",
  }).toString();
  return res.redirect(`${baseUrl}?${params}`);
};
export const ghSigninAccess: RequestHandler = async (req, res) => {
  const {
    session,
    query: { code },
  } = req;
  try {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const params = new URLSearchParams({
      client_id: process.env.GH_OAUTH_ID!,
      client_secret: process.env.GH_OAUTH_SECRET!,
      code: code + "",
    }).toString();
    const { access_token, token_type } = await fetch(`${baseUrl}?${params}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    }).then((data) => data.json());

    if (!access_token) return res.redirect("/signin");

    const apiUrl = "https://api.github.com";
    const {
      avatar_url: avatarUrl,
      name,
      login: username,
      location,
    } = await fetch(`${apiUrl}/user`, {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }).then((data) => data.json());

    const emails = (await fetch(`${apiUrl}/user/emails`, {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }).then((data) => data.json())) as TGHEmails;

    const { email } =
      emails.find(({ primary, verified }) => primary && verified) ?? {};

    if (!email) return res.redirect("/signin");

    let user = await User.findOne({ email });
    if (!user)
      user = await User.create({
        username,
        email,
        name,
        avatarUrl,
        location,
        password: "",
        socialOnly: true,
        videos: [],
        comments: [],
      });

    session.loggedIn = true;
    session.user = user;
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
export const profile: RequestHandler = (_, res) => {
  const { locals } = res;
  locals.pageTitle = "User Profile";
  return res.render("users/profile");
};
export const postProfile: RequestHandler = async (req, res) => {
  const { locals } = res;
  const {
    body: { name, email, username, location },
    file,
    user,
  } = req;
  locals.pageTitle = "User Profile";

  const isEmail = user.email !== email && (await User.exists({ email }));
  const isUsername =
    user.username !== username && (await User.exists({ username }));
  if (isEmail || isUsername) {
    locals.error = {
      user: "이름이나 이메일 중 이미 존제합니다.",
    };
    return res.status(400).render("users/profile");
  }
  const fileUrl = isDev ? file?.path : file?.location;
  const isFile = typeof fileUrl !== "undefined";
  isFile &&
    user.avatarUrl &&
    (isDev ? fs.rmSync(user.avatarUrl) : await removeFile(user.avatarUrl!));
  const avatarUrl = isFile ? fileUrl : user.avatarUrl;
  const updateUser = await User.findByIdAndUpdate(
    user.id,
    {
      avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updateUser!;
  return res.redirect("profile");
};
export const changePassword: RequestHandler = (_, res) => {
  const { locals } = res;
  locals.pageTitle = "Change Password";
  return res.render("users/change-password");
};
export const postChangePassword: RequestHandler = async (req, res) => {
  const {
    body: { curPassword, password, password2 },
    user,
  } = req;
  const { locals } = res;
  locals.pageTitle = "Change Password";
  const isCompare = await bcrypt.compare(curPassword, user.password!);
  if (!isCompare || password !== password2) {
    locals.error = {
      ...(!isCompare && { password: "기존 비밀번호가 맞지 않습니다." }),
      ...(password !== password2 && {
        password: "새로운 비밀번호가 서로 맞지 않습니다.",
      }),
    };
    return res.status(400).render("users/change-password");
  }
  user.password = password;
  user.save();
  req.session.destroy(() => {});
  return res.redirect("/signin");
};
export const summary: RequestHandler = async (req, res) => {
  const { locals } = res;
  locals.pageTitle = "User Summary";
  locals.user = req.user;
  return res.render("users/summary");
};

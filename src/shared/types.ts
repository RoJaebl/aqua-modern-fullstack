import { Response } from "express";
import { Request } from "express-serve-static-core";
import User from "../models/user.model";
import { Session } from "inspector";
import { Cookie, SessionData } from "express-session";

export type VideoModel = {
  title: String;
  id: Number;
  description: String;
  hashtags: String;
};
export type LocalsType = {
  pageTitle?: String;
  siteName?: String;
  error?: Record<any, String>;
  videos?: VideoModel[];
  formData?: Record<any, String>;
};
export interface AppResponse extends Response {
  locals: LocalsType;
}

export interface SessionType extends Partial<SessionData> {
  id: string;
  cookie: Cookie;
  regenerate(callback: (err: any) => void): this;
  destroy(callback: (err: any) => void): this;
  reload(callback: (err: any) => void): this;
  resetMaxAge(): this;
  save(callback?: (err: any) => void): this;
  touch(): this;
}
export interface SessionType {
  loggedIn: Boolean;
  user: typeof User.schema.obj;
}
export interface AppRequest extends Request {
  session: SessionType;
}

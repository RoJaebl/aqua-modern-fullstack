import { Response } from "express";
import { Request } from "express-serve-static-core";
import User from "../models/user.model";
import { Session } from "inspector";
import { Cookie, SessionData } from "express-session";

type TVideoModel = {
  title: String;
  id: Number;
  description: String;
  hashtags: String;
};
interface ILocals extends TLocalsSession {
  pageTitle?: String;
  siteName?: String;
  error?: Record<any, String>;
  videos?: TVideoModel[];
  formData?: Record<any, String>;
}
export interface AppResponse extends Response {
  locals: ILocals;
}

type TLocalsSession = {
  loggedIn?: Boolean;
  user?: typeof User.schema.obj;
};
interface ISession extends Partial<SessionData> {
  id: string;
  cookie: Cookie;
  regenerate(callback: (err: any) => void): this;
  destroy(callback: (err: any) => void): this;
  reload(callback: (err: any) => void): this;
  resetMaxAge(): this;
  save(callback?: (err: any) => void): this;
  touch(): this;
}
interface ISession extends TLocalsSession {}
export interface AppRequest extends Request {
  session: ISession;
}

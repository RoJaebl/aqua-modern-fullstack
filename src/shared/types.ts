import { Request } from "express";
import { SessionData } from "express-session";
import { IUserDocument } from "../models/user.model";
import { Document, Types } from "mongoose";

type TVideoModel = {
  title: String;
  id: Number;
  description: String;
  hashtags: String;
};

declare global {
  namespace Express {
    export interface Locals extends Pick<SessionData, "loggedIn" | "user"> {
      pageTitle?: String;
      siteName?: String;
      error?: Record<any, String>;
      videos?: TVideoModel[];
      formData?: Record<any, String>;
    }
    export interface Request {
      user?:
        | (Document<unknown, {}, IUserDocument> &
            IUserDocument & {
              _id: Types.ObjectId;
            })
        | null;
    }
  }
}
declare module "express-session" {
  export interface SessionData {
    loggedIn: Boolean;
    user: IUserDocument & {
      _id: Types.ObjectId;
    };
  }
}

export type TGHEmail = {
  email: String;
  primary: Boolean;
  verified: Boolean;
  visibility: null;
};
export type TGHEmails = TGHEmail[];

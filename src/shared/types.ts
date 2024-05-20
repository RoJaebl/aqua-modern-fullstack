import { SessionData } from "express-session";
import { IUserSchemaDefinition } from "../models/user.model";
import { Types } from "mongoose";

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
  }
}
declare module "express-session" {
  export interface SessionData {
    loggedIn: Boolean;
    user: IUserSchemaDefinition & {
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

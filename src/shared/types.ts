import { IVideoDocument } from "./../models/video.model";
import { SessionData } from "express-session";
import { IUserDocument } from "../models/user.model";
import { Document, Types } from "mongoose";

declare global {
  namespace Express {
    export interface Locals extends Pick<SessionData, "loggedIn" | "user"> {
      pageTitle?: String;
      siteName?: String;
      error?: Record<any, String>;
      videos?: IVideoDocument | Array<IVideoDocument>;
      formData?: Record<any, String>;
    }
    export interface Request {
      user?: (Document<unknown, {}, IUserDocument> & IUserDocument) | null;
      video?: (Document<unknown, {}, IVideoDocument> & IVideoDocument) | null;
      files?: Record<string, Multer.File[]>;
    }
  }
}

declare module "express-session" {
  export interface SessionData {
    loggedIn?: Boolean;
    user?: IUserDocument;
  }
}

export type TGHEmail = {
  email: String;
  primary: Boolean;
  verified: Boolean;
  visibility: null;
};
export type TGHEmails = TGHEmail[];

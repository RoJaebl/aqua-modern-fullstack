import { IVideoDocument } from "./../models/video.model";
import { SessionData } from "express-session";
import { IUserDocument } from "../models/user.model";
import { Document, PopulateOptions, Schema, Types } from "mongoose";
import { Response as Res } from "express";
import { ICommentDocument } from "../models/comment.model";

export type TDocument<T> =
  | T & Document<unknown, {}, T> & Omit<Document<unknown, {}, T>, never>;

export type TPopulatePath =
  | string
  | PopulateOptions
  | (string | PopulateOptions)[];
export interface Response extends Res<any, Record<string, any>> {}

declare global {
  namespace Express {
    export interface Locals extends Pick<SessionData, "loggedIn" | "user"> {
      pageTitle?: String;
      siteName?: String;
      error?: Record<any, String>;
      videos?: IVideoDocument[];
      video?: IVideoDocument & {
        comments: (ICommentDocument | Schema.Types.ObjectId | Types.ObjectId)[];
      };
      formData?: Record<any, String>;
    }
    export interface Request {
      user: TDocument<IUserDocument>;
      video: TDocument<IVideoDocument>;
      comment: TDocument<ICommentDocument>;
      file?: Record<string, Multer.File>;
      files?: Record<string, Multer.File[]>;
    }
  }
}

declare module "express-session" {
  export interface SessionData {
    loggedIn?: Boolean;
    user?: TDocument<IUserDocument>;
  }
}

export type TGHEmail = {
  email: String;
  primary: Boolean;
  verified: Boolean;
  visibility: null;
};
export type TGHEmails = TGHEmail[];

import { Response } from "express";

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

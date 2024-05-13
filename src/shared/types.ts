import { Response } from "express";

export type LocalsType = {
  pageTitle: String;
  siteName: String;
};
export interface AppResponse extends Response {
  locals: LocalsType;
}

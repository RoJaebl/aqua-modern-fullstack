import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "./user.model";
import { IVideoDocument } from "./video.model";
import { TDocument } from "../shared/types";

export interface ICommentDocument {
  _id: Schema.Types.ObjectId;
  text: string;
  owner: Schema.Types.ObjectId | TDocument<IUserDocument>;
  video: Schema.Types.ObjectId | TDocument<IVideoDocument>;
  createdAt: Date;
}
const commentSchema = new Schema<ICommentDocument>({
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model<ICommentDocument>("Comment", commentSchema);
export default Comment;

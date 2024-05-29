import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TDocument } from "../shared/types";
import { ICommentDocument } from "./comment.model";
import { IVideoDocument } from "./video.model";

export interface IUserDocument {
  _id: Schema.Types.ObjectId;
  email: string;
  avatarUrl?: string;
  socialOnly: boolean;
  username: string;
  password?: string;
  name: string;
  location?: string;
  comments: (Schema.Types.ObjectId | TDocument<ICommentDocument>)[];
  videos: (Schema.Types.ObjectId | TDocument<IVideoDocument>)[];
}
const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password ?? "", 5);
  }
});

const User = mongoose.model<IUserDocument>("User", userSchema);
export default User;

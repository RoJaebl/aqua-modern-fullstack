import mongoose, { Document, HydratedDocument, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";

export interface IUserDocument {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  avatarUrl?: string;
  socialOnly: boolean;
  username: string;
  password?: string;
  name: string;
  location?: string;
  videos: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password ?? "", 5);
  }
});

const User = mongoose.model<IUserDocument>("User", userSchema);
export default User;

import mongoose, { Document, HydratedDocument, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export interface IUserDocument {
  email: string;
  avatarUrl?: string;
  socialOnly: boolean;
  username: string;
  password?: string;
  name: string;
  location?: string;
  videos: mongoose.Schema.Types.ObjectId[];
}

// export interface IUserModel extends Model<IUserDocument> {
//   protector(req: Request, res: Response): HydratedDocument<IUserDocument>;
// }

const userSchema = new mongoose.Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [
    { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password ?? "", 5);
  }
});

// userSchema.static("protector", async function (req: Request, res: Response) {
//   const {
//     session: { user: { _id } = {} },
//   } = req;
//   const { locals } = res;
//   let user;
//   try {
//     user = await User.findById("664c56d106e966ab275ef9b8");
//   } catch (err) {
//     console.log(err);
//   }
//   if (!user) {
//     locals.error = {
//       page: "사용자가 존제하지 않습니다.",
//     };
//     return res.status(404).redirect("/");
//   }
//   return user;
// });

const User = mongoose.model<IUserDocument>("User", userSchema);
export default User;

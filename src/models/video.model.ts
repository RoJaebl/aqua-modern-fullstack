import mongoose from "mongoose";

export interface IVideoDocument {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  fileUrl: string;
  thumbUrl: string;
  description: string;
  createdAt: Date;
  hashtags?: string[];
  meta: {
    views: number;
    rating: number;
  };
  owner: mongoose.Schema.Types.ObjectId;
}

const videoSchema = new mongoose.Schema<IVideoDocument>({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Video = mongoose.model<IVideoDocument>("Video", videoSchema);
export default Video;

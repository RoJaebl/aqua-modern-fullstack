import mongoose, { Model } from "mongoose";

export interface IVideoDocument {
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

export interface IVideoModel extends Model<IVideoDocument> {
  formatHashtags(tags: string): string;
}

const videoSchema = new mongoose.Schema<IVideoDocument, IVideoModel>({
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

videoSchema.static("formatHashtags", (tags: string) => {
  return tags
    .split(/(?:, +)|(?:,)/)
    .map((word) =>
      word.startsWith("#") ? word.replace(/^(#+)/, "#") : `#${word}`
    );
});

const Video = mongoose.model<IVideoDocument, IVideoModel>("Video", videoSchema);
export default Video;

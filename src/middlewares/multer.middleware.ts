import multer from "multer";
import multerS3 from "multer-s3";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const isDev = process.env.NODE_ENV === "development";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_IAM_KEY!,
    secretAccessKey: process.env.AWS_IAM_SECRET!,
  },
  region: "ap-northeast-2",
});
export const removeFile = async (url: string) =>
  await s3.send(
    new DeleteObjectCommand({
      Bucket: "rojaebl-aqua-modern-fullstack",
      Key: decodeURIComponent(url.split(".amazonaws.com/").pop()!.toString()),
    })
  );

export const s3AvatarUpload = multerS3({
  s3,
  bucket: "rojaebl-aqua-modern-fullstack",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `avatars/${req.session.user?.email}/${Date.now().toString()}`);
  },
});
export const s3VideoUpload = multerS3({
  s3,
  bucket: "rojaebl-aqua-modern-fullstack",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `videos/${req.session.user?.email}/${Date.now().toString()}`);
  },
});

export const avatarUpload = multer({
  ...(isDev ? { dest: "uploads/avatars" } : { storage: s3AvatarUpload }),
  limits: {
    fieldSize: 10_000_000, // 10MB
  },
});

export const videoUpload = multer({
  ...(isDev ? { dest: "uploads/videos" } : { storage: s3VideoUpload }),
  limits: {
    fieldSize: 100_000_000, // 100MB
  },
});

import { RequestHandler } from "express";
import multer from "multer";

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: {
    fieldSize: 10_000_000, // 10MB
  },
});

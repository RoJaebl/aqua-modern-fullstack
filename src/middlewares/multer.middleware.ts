import multer from "multer";

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: {
    fieldSize: 10_000_000, // 10MB
  },
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: {
    fieldSize: 100_000_000, // 100MB
  },
});

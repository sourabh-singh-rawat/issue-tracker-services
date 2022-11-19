import express from "express";
const router = express.Router();
import multer from "multer";
import fs from "fs/promises";

import AttachmentController from "../controllers/issue-attachment.controller.js";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { id } = req.params;
    await fs.mkdir(`uploads/attachments/issues/${id}`, { recursive: true });
    cb(null, `uploads/attachments/issues/${id}`);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name = file.originalname;
    cb(null, uniquePrefix + "-" + name);
  },
});

const acceptedFileTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (!acceptedFileTypes.includes(file.mimetype)) {
      return cb(new Error("file type not accepted"));
    }
    cb(null, true);
  },
}).single("file");

router.post("/issues/:id/attachments", AttachmentController.uploadImage);
router.get("/issues/:id/attachments", AttachmentController.indexImages);

export default router;

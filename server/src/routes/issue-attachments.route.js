import express from 'express';
import multer from 'multer';
import IssueAttachmentController from '../controllers/issue-attachment/index.js';
import { auth } from '../middlewares/auth.middleware.js';

const upload = multer({
  limits: {
    fileSize: 5242880, // 5MB
  },
  fileFilter: (req, file, callback) => {
    // file type validation
    const acceptableMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!acceptableMimeTypes.includes(file.mimetype)) {
      return callback(new Error('Please upload an image'));
    }

    return callback(undefined, true);
  },
});

const router = express.Router();

router.post(
  '/issues/:id/attachments',
  auth,
  upload.single('file'),
  IssueAttachmentController.create,
);
router.get('/issues/:id/attachments', auth, IssueAttachmentController.index);
router.get(
  '/issues/:id/attachments/:attachmentId',
  auth,
  IssueAttachmentController.show,
);

export default router;

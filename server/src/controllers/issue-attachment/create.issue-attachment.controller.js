/* eslint-disable object-curly-newline */

import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import db from '../../config/db.config.js';
import uploadImage from '../../utils/firebase.util.js';
import User from '../../models/user/user.model.js';
import ProjectMember from '../../models/project-member/project-member.model.js';
import IssueAttachment from '../../models/issue-attachment/issue-attachment.model.js';

/**
 * Creates a new attachment entry
 * @param {*} req
 * @param {*} res
 */
// [x]: check if the file is an image
// [x]: crop it into two sizes
// TODO: upload the file to the firebase storage
// TODO: create a new entry in the database

const create = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;
  const { mimetype, originalname, buffer } = req.file;

  // cropped file sizes
  const sizes = { small: { width: 250 }, large: { width: 1200 } };

  try {
    // resizes the uploaded file
    const smallImageBuffer = await sharp(buffer)
      .resize(sizes.small.width)
      .toBuffer();

    const largeImageBuffer = await sharp(buffer)
      .resize(sizes.large.width)
      .toBuffer();

    const filename = uuidv4();

    // uploading file to firebase storage
    const { images, bucketName } = await uploadImage({
      smallImageBuffer,
      largeImageBuffer,
      issueId: id,
      filename,
      contentType: mimetype,
      originalName: originalname,
    });

    // create a new entry in the database
    db.query('BEGIN');
    const { id: userId } = await User.findOne(uid);
    const memberId = await ProjectMember.findOne({ memberId: userId });

    // TODO: Make this optimized
    await IssueAttachment.insertOne({
      filename,
      originalFilename: originalname,
      contentType: mimetype,
      bucket: bucketName,
      path: images[0],
      variant: 'small',
      ownerId: memberId,
      issueId: id,
    });

    await IssueAttachment.insertOne({
      filename,
      originalFilename: originalname,
      contentType: mimetype,
      bucket: bucketName,
      path: images[1],
      variant: 'large',
      ownerId: memberId,
      issueId: id,
    });

    db.query('COMMIT');

    return res.status(200).send('Image uploaded successfully');
  } catch (error) {
    db.query('ROLLBACK');
    return res
      .status(500)
      .send('Cannot upload the image. Please try again later.');
  }
};

export default create;

import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import uploadImage from '../utils/firebase.util.js';
import UserRepository from '../database/repositories/UserRepository';

const create = async (req: any, res: any) => {
  // const { id } = req.params;
  // const { uid } = req.user;
  // const { mimetype, originalname, buffer } = req.file;

  // // cropped file sizes
  // const sizes = { small: { width: 250 }, large: { width: 1200 } };

  // try {
  //   // resizes the uploaded file
  //   const smallImageBuffer = await sharp(buffer)
  //     .resize(sizes.small.width)
  //     .toBuffer();

  //   const largeImageBuffer = await sharp(buffer)
  //     .resize(sizes.large.width)
  //     .toBuffer();

  //   const filename = uuidv4();

  //   // uploading file to firebase storage
  //   const { images, bucketName } = await uploadImage({
  //     smallImageBuffer,
  //     largeImageBuffer,
  //     issueId: id,
  //     filename,
  //     contentType: mimetype,
  //     originalName: originalname,
  //   });

  //   // create a new entry in the database
  //   db.query('BEGIN');
  //   const { id: userId } = await User.findOne(uid);
  //   const memberId = await ProjectMember.findOne({ memberId: userId });

  //   // TODO: Make this optimized
  //   await IssueAttachment.insertOne({
  //     filename,
  //     originalFilename: originalname,
  //     contentType: mimetype,
  //     bucket: bucketName,
  //     path: images[0],
  //     variant: 'small',
  //     ownerId: memberId,
  //     issueId: id,
  //   });

  //   await IssueAttachment.insertOne({
  //     filename,
  //     originalFilename: originalname,
  //     contentType: mimetype,
  //     bucket: bucketName,
  //     path: images[1],
  //     variant: 'large',
  //     ownerId: memberId,
  //     issueId: id,
  //   });

  //   db.query('COMMIT');

  //   return res.status(200).send('Image uploaded successfully');
  // } catch (error) {
  //   db.query('ROLLBACK');
  //   return res
  //     .status(500)
  //     .send('Cannot upload the image. Please try again later.');
  // }
};

const index = async (req: any, res: any) => {
  // const { id } = req.params;

  // try {
  //   const attachments = await IssueAttachment.find(id);

  //   res.send({ rows: attachments, rowCount: attachments.length });
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const show = async (req: any, res: any) => {
  // const { attachmentId } = req.params;

  // try {
  //   const { path } = await IssueAttachment.findOne(attachmentId);
  //   // get signed URL
  //   const signedUrl = await adminStorage.file(path).getSignedUrl({
  //     action: 'read',
  //     expires: '03-09-2491',
  //   });

  //   res.send({ signedUrl });
  // } catch (error) {
  //   res.status(500).send();
  // }
};

const IssueAttachmentController = {
  create,
  index,
  show,
};

export default IssueAttachmentController;

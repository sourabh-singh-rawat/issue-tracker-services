/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
import { adminStorage } from '../config/firebase.config.js';

/**
 *
 * @param {uuid} issueId - The issue id
 * @param {Buffer} smallImageBuffer - The small image buffer
 * @param {Buffer} largeImageBuffer - The large image buffer
 * @param {string} contentType - The content type of the image
 * @param {string} filename - The new filename of the image
 * @returns {Promise} A Promise object that contains the path of the uploaded images
 */
const uploadImage = async ({
  issueId,
  smallImageBuffer,
  largeImageBuffer,
  contentType,
  filename,
}) => {
  try {
    const smallImagePath = `attachments/${issueId}/${filename}-small`;
    const largeImagePath = `attachments/${issueId}/${filename}-large`;

    await adminStorage
      .file(smallImagePath)
      .save(smallImageBuffer, { contentType });
    await adminStorage
      .file(largeImagePath)
      .save(largeImageBuffer, { contentType });

    return {
      images: [smallImagePath, largeImagePath],
      bucketName: adminStorage.name,
    };
  } catch (error) {
    return error;
  }
};

export default uploadImage;

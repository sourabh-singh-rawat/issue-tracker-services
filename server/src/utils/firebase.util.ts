/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
import { adminStorage } from '../config/firebase.config.js';

class FirebaseUtils {
  public async uploadImage({
    issueId,
    smallImageBuffer,
    largeImageBuffer,
    contentType,
    filename,
  }: any): Promise<any> {
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
  }
}

export default new FirebaseUtils();

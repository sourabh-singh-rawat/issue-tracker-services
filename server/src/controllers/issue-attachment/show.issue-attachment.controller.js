import { adminStorage } from '../../config/firebase.config.js';
import IssueAttachment from '../../models/issue-attachment/issue-attachment.model.js';

const show = async (req, res) => {
  const { attachmentId } = req.params;

  try {
    const { path } = await IssueAttachment.findOne(attachmentId);
    // get signed URL
    const signedUrl = await adminStorage.file(path).getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    res.send({ signedUrl });
  } catch (error) {
    res.status(500).send();
  }
};

export default show;

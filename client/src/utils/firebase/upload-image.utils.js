import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase.config';

const uploadImage = async ({ file, issueId }) => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filePath = `attachments/issues/${issueId}/${uniqueSuffix}#${file.name}`;
  const fileReference = ref(storage, filePath);

  try {
    const uploadedImage = await uploadBytes(fileReference, file);
    const { metadata } = uploadedImage;
    const url = await getDownloadURL(fileReference);

    return { ...metadata, url };
  } catch (error) {
    return error;
  }
};

export default { uploadImage };

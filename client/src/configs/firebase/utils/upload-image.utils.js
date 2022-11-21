import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";

export const uploadImage = async ({ file, issueId, accessToken }) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filePath = `attachments/issues/${issueId}/${uniqueSuffix}#${file.name}`;
  const fileReference = ref(storage, filePath);

  try {
    const uploadedImage = await uploadBytes(fileReference, file);
    const metadata = uploadedImage.metadata;
    const { bucket, fullPath, name, size, contentType } = metadata;
    const url = await getDownloadURL(fileReference);

    const response = await fetch(
      `http://localhost:4000/api/issues/${issueId}/attachments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          bucket,
          fullPath,
          name,
          size,
          contentType,
          url,
        }),
      }
    );

    const data = await response.json();
    return response;
  } catch (error) {
    console.log("Error uploading the image. Please try again", error);
  }
};

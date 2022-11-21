import { getDownloadURL, ref, list } from "firebase/storage";
import { storage } from "../firebase.config";

export const getImages = async ({ issueId }) => {
  const folderReference = ref(storage, `attachment/issues/${issueId}`);

  const firstPage = await list(folderReference, { maxResults: 100 });

  firstPage.items.forEach((item) => {
    console.log(item);
  });
};

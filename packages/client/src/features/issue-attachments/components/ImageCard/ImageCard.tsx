import { ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { ImageListItem, Skeleton, useTheme } from "@mui/material";
import { storage } from "../../../../api/firebase.config";

interface ImageCardProps {
  path: string;
}

export default function ImageCard({ path }: ImageCardProps) {
  const theme = useTheme();
  const [src, setSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const { data, isSuccess } = useGetIssueAttachmentQuery({
  //   issueId,
  //   attachmentId,
  // });

  useEffect(() => {
    (async () => {
      const url = await getDownloadURL(ref(storage, path));
      setSrc(url);

      setIsLoading(false);
    })();
  }, []);

  return (
    <ImageListItem
      sx={{
        overflow: "hidden",
        borderRadius: theme.shape.borderRadiusLarge,

        height: "100%",
        width: "100%",
      }}
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <img alt="imageTag" loading="lazy" src={src} />
      )}
    </ImageListItem>
  );
}

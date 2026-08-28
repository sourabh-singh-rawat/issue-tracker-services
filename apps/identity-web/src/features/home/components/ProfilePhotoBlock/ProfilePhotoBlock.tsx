import { useRef, useState, type ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useGetCurrentUserQuery } from "@generated/api/@tanstack/react-query.gen";
import { useCreatePhotoUploadRequestMutation } from "@generated/gql/hooks";
import { getErrorMessage, useSnackbar } from "@shared/ui";

export const ProfilePhotoBlock = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const snackbar = useSnackbar();
  const currentUserQuery = useGetCurrentUserQuery();
  const createPhotoUploadRequestMutation = useCreatePhotoUploadRequestMutation();
  const [isUploading, setIsUploading] = useState(false);
  const identityId = currentUserQuery.data?.identity?.id;

  const isPending = createPhotoUploadRequestMutation.isPending || isUploading;

  const handleSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!identityId) {
      snackbar.error("Sign in to upload a profile photo.");
      return;
    }

    setIsUploading(true);

    try {
      const result = await createPhotoUploadRequestMutation.mutateAsync({
        input: {
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          size: file.size,
        },
      });

      const target = result.createPhotoUploadRequest;
      if (!target?.url) {
        throw new Error("Missing upload target URL");
      }

      const formData = new FormData();
      formData.append("file", file);

      const headers: Record<string, string> = {};
      if (target.headers) {
        for (const item of target.headers) {
          if (item.key && item.value && item.key.toLowerCase() !== "content-type") {
            headers[item.key] = item.value;
          }
        }
      }

      const response = await fetch(target.url, {
        method: "PUT",
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      snackbar.success("Profile photo uploaded.");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Could not upload profile photo. Please try again."));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          px: 3,
          py: 2.5,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Profile photo
        </Typography>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleSelectFile}
        />
        <Button
          variant="outlined"
          size="small"
          disabled={isPending}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          {isPending ? "Uploading…" : "Upload"}
        </Button>
      </Box>
    </Paper>
  );
};

import { useRef, type ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useGetCurrentUserQuery } from "@generated/api/@tanstack/react-query.gen";
import { useCreateUploadTargetMutation } from "@generated/gql/hooks";
import { getErrorMessage, useSnackbar } from "@shared/ui";

export const ProfilePhotoBlock = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const snackbar = useSnackbar();
  const currentUserQuery = useGetCurrentUserQuery();
  const createUploadTargetMutation = useCreateUploadTargetMutation();
  const identityId = currentUserQuery.data?.identity?.id;

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

    try {
      await createUploadTargetMutation.mutateAsync({
        input: {
          tenantId: identityId,
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          size: file.size,
        },
      });
      snackbar.success("Upload target created.");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Could not create an upload target. Please try again."));
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
          disabled={createUploadTargetMutation.isPending}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          {createUploadTargetMutation.isPending ? "Uploading…" : "Upload"}
        </Button>
      </Box>
    </Paper>
  );
};

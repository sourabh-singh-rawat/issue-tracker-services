import { GetApp } from "@mui/icons-material";
import { Grid2, IconButton, Input, styled, Typography, useTheme } from "@mui/material";
import MuiImageList from "@mui/material/ImageList";
import { Stack } from "@mui/system";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useDeleteAttachmentMutation, useFindFilesQuery } from "@generated/gql";
import { useCreateAttachmentMutation } from "@generated/api/@tanstack/react-query.gen";
import { AppLoader, useSnackbar } from "@shared";
import { ImageCard } from "../ImageCard";

const VisuallyHiddenInput = styled(Input)({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface ItemAttachmentProps {
  issueId: string;
}

/**
 * Used to upload attachments
 */
export const IssueAttachments = ({ issueId }: ItemAttachmentProps) => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: createAttachment, isPending: isLoading } = useCreateAttachmentMutation();
  const { data: files } = useFindFilesQuery(
    { issueId },
    {
      select: (data) => data.findFiles,
      enabled: Boolean(issueId),
      staleTime: 0,
      refetchOnMount: "always",
    },
  );
  const { mutateAsync: deleteAttachment } = useDeleteAttachmentMutation();

  return (
    <>
      <Grid2 columnSpacing={1} sx={{ marginTop: theme.spacing(2) }} container>
        <IconButton
          component="label"
          tabIndex={-1}
          sx={{
            width: "100%",
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadiusSmall,
          }}
          disableRipple
        >
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            {isLoading ? <AppLoader /> : <GetApp />}
            <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
              Click to upload attachment
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[700] }}>
              *Maximum file size 5MB
            </Typography>
          </Stack>
          <VisuallyHiddenInput
            type="file"
            inputRef={inputRef}
            onChange={async () => {
              if (!inputRef.current) return;

              const selectedFiles = inputRef.current.files;
              if (!selectedFiles) return;

              const file = selectedFiles[0];
              if (!file) return;

              await createAttachment({
                path: { issueId },
                body: { file },
              });
              void queryClient.invalidateQueries({
                queryKey: useFindFilesQuery.getKey({ issueId }),
              });
            }}
          />
        </IconButton>
      </Grid2>
      <MuiImageList cols={6} rowHeight={124} sx={{ width: "100%" }} variant="quilted">
        {(files?.rows ?? [])
          .filter(
            (row): row is { id: string; thumbnailLink: string } =>
              Boolean(row.id) && Boolean(row.thumbnailLink),
          )
          .map(({ id, thumbnailLink }) => (
            <div key={id}>
              <ImageCard key={id} path={thumbnailLink} />
              <IconButton
                onClick={async () => {
                  try {
                    const response = await deleteAttachment({
                      deleteAttachmentId: id,
                    });
                    snackbar.success(response.deleteAttachment ?? "Attachment deleted");
                  } catch (error) {
                    snackbar.error(
                      error instanceof Error ? error.message : "Failed to delete attachment",
                    );
                  }
                }}
              >
                <GridDeleteIcon />
              </IconButton>
            </div>
          ))}
      </MuiImageList>
    </>
  );
};

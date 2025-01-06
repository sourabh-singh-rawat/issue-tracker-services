import { GetApp } from "@mui/icons-material";
import {
  Grid2,
  IconButton,
  Input,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import MuiImageList from "@mui/material/ImageList";
import { Stack } from "@mui/system";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useRef } from "react";
import {
  useDeleteAttachmentMutation,
  useFindAttachmentsQuery,
} from "../../../../api/codegen/gql/graphql";
import { useCreateAttachmentMutation } from "../../../../api/codegen/rest/attachment.api";
import { AppLoader } from "../../../../common/components/AppLoader";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
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
  itemId: string;
}

/**
 * Used to upload attachments
 * @param props.itemId Id of item that this attachment belongs to
 */
export const ItemAttachments = ({ itemId }: ItemAttachmentProps) => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const [createAttachment, { isLoading }] = useCreateAttachmentMutation();
  const { data: attachments, refetch } = useFindAttachmentsQuery({
    variables: { itemId },
    fetchPolicy: "network-only",
  });
  const [deleteAttachment] = useDeleteAttachmentMutation({
    onCompleted(response) {
      snackbar.success(response.deleteAttachment);
      refetch();
    },
    onError(error) {
      snackbar.error(error.message);
    },
  });

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
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.main }}
            >
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

              const files = inputRef.current.files;
              if (!files) return;

              const formData = new FormData();
              const file = files[0];

              if (!file) return;
              formData.append("files", file);

              await createAttachment({ itemId, body: formData as any });
              refetch();
            }}
          />
        </IconButton>
      </Grid2>
      <MuiImageList
        cols={6}
        rowHeight={124}
        sx={{ width: "100%" }}
        variant="quilted"
      >
        {(attachments &&
          attachments.findAttachments.rows.map(({ id, thumbnailLink }) => (
            <div key={id}>
              <ImageCard key={id} path={thumbnailLink} />
              <IconButton
                onClick={async () => {
                  await deleteAttachment({
                    variables: { deleteAttachmentId: id },
                  });
                }}
              >
                <GridDeleteIcon />
              </IconButton>
            </div>
          ))) ||
          []}
      </MuiImageList>
    </>
  );
};

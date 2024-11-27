import React, { useEffect } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";
import MuiImageList from "@mui/material/ImageList";
import MuiTypography from "@mui/material/Typography";

import ImageCard from "../../components/ImageCard";

import { styled, useTheme } from "@mui/material";
import { useSelectedTab } from "../../../../common/hooks";
import TabPanel from "../../../../common/components/TabPanel";
import AppLoader from "../../../../common/components/AppLoader";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton";

import GetAppIcon from "@mui/icons-material/GetApp";
import { useMessageBar } from "../../../message-bar/hooks";
import { useCreateAttachmentMutation } from "../../../../api/codegen/rest/attachment.api";
import { useFindAttachmentsQuery } from "../../../../api/codegen/gql/graphql";

const VisuallyHiddenInput = styled("input")({
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

export default function ItemAttachment({ itemId }: ItemAttachmentProps) {
  const theme = useTheme();
  const { showSuccess, showError } = useMessageBar();
  const [createAttachment, { isLoading, isSuccess, isError }] =
    useCreateAttachmentMutation();
  const { data: attachments, refetch } = useFindAttachmentsQuery({
    variables: { itemId },
  });

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;

    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    if (files && files.length) {
      const formData = new FormData();
      formData.append("files", files[0]);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Uploaded files successfully");
    }
    if (isError) showError("Error uploading files");
  }, [isSuccess, isError]);

  return (
    <>
      <MuiGrid columnSpacing={1} sx={{ marginTop: theme.spacing(2) }} container>
        <MuiGrid item xs={12}>
          <VisuallyHiddenInput
            type="file"
            onChange={async (e) => {
              const files = e.target.files;
              const formData = new FormData();

              if (!files) return;
              const file = files[0];

              if (!file) return;
              formData.append("files", file);

              await createAttachment({ itemId, body: formData as any });
              refetch();
            }}
            multiple
          />
          <MuiInput name="file" type="file" sx={{ display: "none" }} />
          <StyledIconButton
            onClick={() =>
              document.querySelector("input[type='file']")?.click()
            }
            sx={{
              width: "100%",
              border: `1px dashed ${theme.palette.divider}`,
              borderWidth: "1.5px",
              borderStyle: "dashed",
              borderRadius: theme.shape.borderRadiusMedium,
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            disableRipple
          >
            <MuiGrid container>
              <MuiGrid item xs={12}>
                {isLoading ? <AppLoader /> : <GetAppIcon />}
              </MuiGrid>
              <MuiGrid item xs={12}>
                <MuiTypography
                  variant="body2"
                  sx={{ color: theme.palette.primary.main }}
                >
                  Click to upload photo
                </MuiTypography>
                <MuiTypography variant="body2">or drag and drop</MuiTypography>
              </MuiGrid>
              <MuiGrid item xs={12}>
                <MuiTypography
                  variant="body2"
                  sx={{ color: theme.palette.grey[700] }}
                >
                  *Maximum file size 5MB
                </MuiTypography>
              </MuiGrid>
            </MuiGrid>
          </StyledIconButton>
        </MuiGrid>
      </MuiGrid>
      <MuiImageList
        cols={6}
        rowHeight={124}
        sx={{ width: "100%" }}
        variant="quilted"
      >
        {attachments?.findAttachments.rows.map(({ id, thumbnailLink }) => (
          <ImageCard key={id} path={thumbnailLink} />
        )) || []}
      </MuiImageList>
    </>
  );
}

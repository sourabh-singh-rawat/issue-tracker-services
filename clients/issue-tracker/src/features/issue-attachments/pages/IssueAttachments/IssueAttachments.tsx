import React, { useEffect } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";
import MuiImageList from "@mui/material/ImageList";
import MuiTypography from "@mui/material/Typography";

import ImageCard from "../../components/ImageCard";

import { useTheme } from "@mui/material";
import { useSelectedTab } from "../../../../common/hooks";
import TabPanel from "../../../../common/components/TabPanel";
import AppLoader from "../../../../common/components/AppLoader";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton";

import GetAppIcon from "@mui/icons-material/GetApp";
import { useMessageBar } from "../../../message-bar/hooks";
import {
  useCreateIssueAttachmentMutation,
  useGetIssueAttachmentListQuery,
} from "../../../../api/generated/storage.api";

function IssueAttachments() {
  const theme = useTheme();
  const { id, selectedTab } = useSelectedTab();
  const { showSuccess, showError } = useMessageBar();
  const [createIssueAttachment, { isLoading, isSuccess, isError }] =
    useCreateIssueAttachmentMutation();
  const { data: issueAttachmentList } = useGetIssueAttachmentListQuery({ id });

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

      createIssueAttachment({ id, body: formData });
    }
  };

  useEffect(() => {
    if (isSuccess) showSuccess("Uploaded files successfully");
    if (isError) showError("Error uploading files");
  }, [isSuccess, isError]);

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid
        component="form"
        encType="multipart/form-data"
        columnSpacing={1}
        sx={{ marginTop: theme.spacing(2) }}
        onChange={(e) => {
          uploadFiles(e.target.files);
        }}
        container
      >
        <MuiGrid item xs={12}>
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
        {issueAttachmentList?.rows.map(({ path }) => (
          <ImageCard key={id} path={path} />
        ))}
      </MuiImageList>
    </TabPanel>
  );
}

export default IssueAttachments;

/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiButton from "@mui/material/Button";
import MuiGrid from "@mui/material/Grid";
import MuiImageList from "@mui/material/ImageList";
import MuiInput from "@mui/material/Input";
import theme from "../../../../config/mui.config";

import ImageCard from "../../components/ImageCard/ImageCard";
import TabPanel from "../../../../common/TabPanel";
import UploadButton from "../../../issue/components/UploadButton";

import {
  useCreateIssueAttachmentMutation,
  useGetIssueAttachmentsQuery,
} from "../../issue-attachments.api";

import { setIssueAttachments } from "../../../issue/issue.slice";
import { setMessageBarOpen } from "../../../message-bar/message-bar.slice";

function IssueAttachments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);

  const attachments = useSelector((store) => store.issue.attachments);

  const getIssueAttachmentsQuery = useGetIssueAttachmentsQuery({
    issueId: id,
  });
  const [createIssue, { isSuccess }] = useCreateIssueAttachmentMutation();

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;
    // starting loading animation on the Upload button
    setOpen(true);

    // store file in FormData Object
    const formData = new FormData();
    formData.append("file", file);

    // send the image to server
    return createIssue({ issueId: id, body: formData });
  };

  // stop loading the animation and display success message
  // once the image is uploaded
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      dispatch(setMessageBarOpen({ message: "Image uploaded successfully" }));
    }
  }, [isSuccess]);

  // once the issue attachments are retrived from the server
  // store them in the redux store
  useEffect(() => {
    if (getIssueAttachmentsQuery.isSuccess) {
      dispatch(setIssueAttachments(getIssueAttachmentsQuery.data));
    }
  }, [getIssueAttachmentsQuery.data]);

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid
        component="form"
        encType="multipart/form-data"
        spacing={1}
        container
      >
        <MuiGrid sx={{ display: "none" }} item>
          <MuiInput name="file" type="file" onChange={handleChange} />
        </MuiGrid>
        <MuiGrid item>
          <MuiButton
            sx={{
              color: theme.palette.grey[200],
              textTransform: "none",
              borderRadius: theme.shape.borderRadiusMedium,
              boxShadow: "none",
              backgroundColor: theme.palette.grey[1200],
              "&:hover": {
                backgroundColor: theme.palette.grey[900],
                boxShadow: theme.shadows[1],
              },
            }}
            variant="contained"
            disableRipple
            onClick={() => {
              document.querySelector('input[type="file"]').click();
            }}
          >
            Choose a file
          </MuiButton>
        </MuiGrid>
        <MuiGrid item>
          <UploadButton label="Upload" open={open} onClick={handleSubmit} />
        </MuiGrid>
      </MuiGrid>
      <MuiImageList
        cols={6}
        rowHeight={124}
        sx={{ width: "100%" }}
        variant="quilted"
      >
        {attachments.rows.map(({ id: attachmentId, path }) => (
          <ImageCard
            key={attachmentId}
            attachmentId={attachmentId}
            issueId={id}
            path={path}
          />
        ))}
      </MuiImageList>
    </TabPanel>
  );
}

export default IssueAttachments;

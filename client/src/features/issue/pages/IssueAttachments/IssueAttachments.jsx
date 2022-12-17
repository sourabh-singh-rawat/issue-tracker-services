import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import { uploadImage } from "../../../../utils/firebase/upload-image.utils.js";
import { theme } from "../../../../config/mui.config";

import MuiGrid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";
import MuiButton from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import TabPanel from "../../../../common/tabs/TabPanel";
import UploadButton from "../../components/buttons/UploadButton";

import {
  useGetIssueAttachmentsQuery,
  useCreateIssueAttachmentMutation,
} from "../../api/issue.api";

import { setIssueAttachments } from "../../slice/issue.slice";
import { setMessageBarOpen } from "../../../message-bar/slice/message-bar.slice";

const IssueAttachments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);

  const accessToken = useSelector((store) => store.auth.accessToken);
  const attachments = useSelector((store) => store.issue.attachments);

  const getIssueAttachmentsQuery = useGetIssueAttachmentsQuery({
    issueId: id,
  });
  const [createIssue, createIssueQuery] = useCreateIssueAttachmentMutation();

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // starting loading animation on the Upload button
    setOpen(true);

    // upload image to firebase storage
    const uploadedImage = await uploadImage({ file, issueId: id, accessToken });

    // upload image metadata to the database
    const { bucket, fullPath, name, size, contentType, url } = uploadedImage;
    createIssue({
      issueId: id,
      body: { bucket, fullPath, name, size, contentType, url },
    });
  };

  // stop loading the animation and display success message
  //  once the image is uploaded
  useEffect(() => {
    if (createIssueQuery.isSuccess) {
      setOpen(false);
      dispatch(setMessageBarOpen({ message: "Image uploaded successfully" }));
    }
  }, [createIssueQuery.isSuccess]);

  // once the issue attachments are retrived from the server
  // store them in the redux store
  useEffect(() => {
    if (getIssueAttachmentsQuery.isSuccess) {
      dispatch(setIssueAttachments(getIssueAttachmentsQuery.data));
    }
  }, [getIssueAttachmentsQuery.data]);

  return (
    <TabPanel selectedTab={selectedTab} index={2}>
      <MuiGrid component="form" spacing={1} container>
        <MuiGrid item sx={{ display: "none" }}>
          <MuiInput name="file" type="file" onChange={handleChange} />
        </MuiGrid>
        <MuiGrid item>
          <MuiButton
            variant="contained"
            onClick={() => {
              document.querySelector('input[type="file"]').click();
            }}
            sx={{
              color: theme.palette.grey[900],
              borderRadius: "6px",
              textTransform: "none",
              backgroundColor: theme.palette.grey[100],
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
              },
            }}
            disableRipple
          >
            Choose a file
          </MuiButton>
        </MuiGrid>
        <MuiGrid item>
          <UploadButton label="Upload" onClick={handleSubmit} open={open} />
        </MuiGrid>
      </MuiGrid>
      <ImageList
        variant="quilted"
        rowHeight={170}
        cols={5}
        sx={{ width: "100%" }}
      >
        {attachments.rows.map(({ id, url }) => {
          return (
            <ImageListItem key={id}>
              <img src={url} srcSet={url} loading="lazy" />
            </ImageListItem>
          );
        })}
      </ImageList>
    </TabPanel>
  );
};

export default IssueAttachments;

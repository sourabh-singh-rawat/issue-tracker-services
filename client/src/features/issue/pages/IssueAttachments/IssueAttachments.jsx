import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import { uploadImage } from "../../../../configs/firebase/utils/upload-image.utils";

import MuiBox from "@mui/material/Box";
import MuiInput from "@mui/material/Input";
import MuiButton from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import TabPanel from "../../../../common/TabPanel";

import { useGetIssueAttachmentsQuery } from "../../issue.api";

import { setIssueAttachments } from "../../issue.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";

const IssueAttachments = () => {
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const { id } = useParams();
  const [file, setFile] = useState();
  const getIssueAttachmentsQuery = useGetIssueAttachmentsQuery(id);
  const accessToken = useSelector((store) => store.auth.accessToken);
  const attachments = useSelector((store) => store.issue.attachments);

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImage = await uploadImage({ file, issueId: id, accessToken });
    if (uploadedImage.status === 200) dispatch(setSnackbarOpen(true));
  };

  // once the issue attachments are retrived from the server
  // store them in the redux store
  useEffect(() => {
    if (getIssueAttachmentsQuery.isSuccess)
      dispatch(setIssueAttachments(getIssueAttachmentsQuery.data));
  }, [getIssueAttachmentsQuery.data]);

  return (
    <TabPanel selectedTab={selectedTab} index={2}>
      <MuiBox component="form">
        <MuiInput name="file" type="file" onChange={handleChange} />
        <MuiButton type="submit" onClick={handleSubmit}>
          Upload
        </MuiButton>
      </MuiBox>
      <ImageList
        variant="quilted"
        rowHeight={170}
        cols={4}
        sx={{ width: "100%", height: 450 }}
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

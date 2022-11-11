import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiInput from "@mui/material/Input";
import MuiButton from "@mui/material/Button";

import TabPanel from "../../../../common/TabPanel";

import { useGetIssueAttachmentsQuery } from "../../issue.api";
import { setIssueAttachments } from "../../issue.slice";
import { ImageList, ImageListItem } from "@mui/material";

const IssueAttachments = () => {
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const { id } = useParams();
  const [file, setFile] = useState();
  const attachments = useSelector((store) => store.issue.attachments);
  const getIssueAttachments = useGetIssueAttachmentsQuery(id);

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

    await fetch(`http://localhost:4000/api/issues/${id}/attachments`, {
      body: data,
      method: "POST",
    });
  };

  useEffect(() => {
    if (getIssueAttachments.isSuccess) {
      dispatch(setIssueAttachments(getIssueAttachments.data));
    }
  }, [getIssueAttachments.data]);

  return (
    <TabPanel selectedTab={selectedTab} index={3}>
      <MuiBox component="form">
        <MuiInput name="file" type="file" onChange={handleChange} />
        <MuiButton type="submit" onClick={handleSubmit}>
          Upload
        </MuiButton>
        <ImageList
          sx={{ width: "100%" }}
          variant="quilted"
          cols={4}
          rowHeight={164}
        >
          {attachments.rows.map((attachment) => {
            return (
              <ImageListItem key={attachment}>
                <img
                  src={`http://localhost:4000/attachments/issues/${id}/${attachment}`}
                  srcSet={`http://localhost:4000/attachments/issues/${id}/${attachment}`}
                  loading="lazy"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </MuiBox>
    </TabPanel>
  );
};

export default IssueAttachments;

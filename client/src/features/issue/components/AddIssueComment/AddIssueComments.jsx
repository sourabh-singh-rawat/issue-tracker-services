import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

import TextField from "../../../../common/TextField";

import { useCreateIssueCommentMutation } from "../../issue.api";

export default function AddIssueComments() {
  const { id } = useParams();
  const [createComment] = useCreateIssueCommentMutation();

  const [commentBoxSelected, setCommentBoxSelected] = useState(false);

  const [formFields, setFormFields] = useState({
    issue_id: id,
    description: "",
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, description: e.target.value });
  };

  const handleSave = (e) => {
    // Don't like the title change it to something else because bernardo is not leaving
    if (formFields.description.length > 0) {
      const { issue_id, description } = formFields;
      createComment({ issue_id, description });
    }
  };

  return (
    <Fragment>
      {commentBoxSelected ? (
        <Fragment>
          <TextField
            value={formFields.description}
            onChange={handleChange}
            autoFocus
          />
          <MuiButton
            variant="contained"
            onClick={handleSave}
            sx={{
              boxShadow: "none",
              textTransform: "none",
              marginTop: "10px",
              ":hover": { boxShadow: "none" },
            }}
          >
            <MuiTypography variant="body2">Save</MuiTypography>
          </MuiButton>
        </Fragment>
      ) : (
        <TextField
          placeholder="Add comment..."
          onClick={() => setCommentBoxSelected(true)}
        ></TextField>
      )}
    </Fragment>
  );
}

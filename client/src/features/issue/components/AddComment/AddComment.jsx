import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import MuiTextField from "@mui/material/TextField";
import MuiShortTextIcon from "@mui/icons-material/ShortText";
import InputAdornment from "@mui/material/InputAdornment";

import { useCreateIssueCommentMutation } from "../../issue.api";

export default function AddComment() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [commentBoxSelected, setCommentBoxSelected] = useState(false);
  const [createComment, { isSuccess }] = useCreateIssueCommentMutation();

  const [formFields, setFormFields] = useState({
    description: "",
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, description: e.target.value });
  };

  const handleSave = (e) => {
    // Don't like the title, change it to something else because bernardo is not leaving
    if (formFields.description.length > 0) {
      const { description } = formFields;
      createComment({ issue_id: id, description });
    }
    setCommentBoxSelected(false);
  };

  const handleCancel = (e) => {
    setCommentBoxSelected(false);
  };

  return (
    <Fragment>
      {commentBoxSelected ? (
        <Fragment>
          <MuiGrid container>
            <MuiGrid item flexGrow={1}>
              <MuiTextField
                size="small"
                placeholder="Add Comment"
                onChange={handleChange}
                sx={{
                  input: { fontSize: "14px" },
                  backgroundColor: "action.hover",
                }}
                onClick={() => setCommentBoxSelected(true)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MuiShortTextIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                autoFocus
              />
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                onClick={handleSave}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  boxShadow: "none",
                  marginLeft: "8px",
                  height: "100%",
                  textTransform: "none",
                  ":hover": {
                    boxShadow: "none",
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <MuiTypography variant="body2">Save</MuiTypography>
              </MuiButton>
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                sx={{
                  boxShadow: "none",
                  textTransform: "none",
                  height: "100%",
                  marginLeft: "8px",
                  ":hover": { boxShadow: "none" },
                }}
                onClick={handleCancel}
              >
                <MuiTypography variant="body2">Cancel</MuiTypography>
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </Fragment>
      ) : (
        <MuiTextField
          size="small"
          placeholder="Add Comment"
          onChange={handleChange}
          sx={{
            input: { fontSize: "14px" },
            backgroundColor: "action.hover",
          }}
          onClick={() => setCommentBoxSelected(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MuiShortTextIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      )}
    </Fragment>
  );
}

import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import MuiTextField from "@mui/material/TextField";
import MuiShortTextIcon from "@mui/icons-material/ShortText";
import InputAdornment from "@mui/material/InputAdornment";

import { useCreateIssueCommentMutation } from "../../../issueComments.api";
import { setLoadingComments } from "../../../issueComments.slice";

const AddComment = () => {
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
    if (formFields.description.length > 0) {
      const { description } = formFields;
      createComment({ issue_id: id, description });
      dispatch(setLoadingComments());
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
                onClick={() => setCommentBoxSelected(true)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MuiShortTextIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "action.hover",
                  borderRadius: "6px",
                  input: { fontSize: "14px" },
                  ".MuiInputBase-root": {
                    fontSize: "14px",
                    borderRadius: "6px",
                  },
                  ".MuiOutlinedInput-root": {
                    borderRadius: "6px",
                  },
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
            borderRadius: "6px",
            ".MuiInputBase-root": {
              fontSize: "14px",
              borderRadius: "6px",
            },
            ".MuiOutlinedInput-root": {
              borderRadius: "6px",
            },
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
};

export default AddComment;

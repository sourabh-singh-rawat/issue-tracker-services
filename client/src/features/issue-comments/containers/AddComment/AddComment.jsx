import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import TextField from "../../../../common/TextField";

import { useCreateIssueCommentMutation } from "../../issue-comments.api";
import { setLoadingComments } from "../../issue-comments.slice";

const AddComment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const [commentBoxSelected, setCommentBoxSelected] = useState(false);
  const [createComment, { isSuccess }] = useCreateIssueCommentMutation();

  const [formFields, setFormFields] = useState({ description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      description: value,
    });
  };

  const handleSave = (e) => {
    if (formFields.description.length > 0) {
      const { description } = formFields;
      createComment({ issue_id: id, description });
      dispatch(setLoadingComments());
      setFormFields({ description: "" });
    }
    setCommentBoxSelected(false);
  };

  const handleCancel = (e) => {
    setCommentBoxSelected(false);
    setFormFields({ description: "" });
  };

  return (
    <Fragment>
      <MuiGrid container>
        <MuiGrid item flexGrow={1}>
          <TextField
            size="small"
            placeholder="Add Comment"
            value={formFields.description}
            onChange={handleChange}
            onClick={() => setCommentBoxSelected(true)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MuiAvatar
                    src={user.photoURL}
                    sx={{ width: "24px", height: "24px", fontSize: "14px" }}
                  >
                    {user.displayName.match(/\b(\w)/g)}
                  </MuiAvatar>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </MuiGrid>
        {commentBoxSelected && (
          <Fragment>
            <MuiGrid item>
              <MuiButton
                onClick={handleSave}
                sx={{
                  color: "white",
                  boxShadow: "none",
                  marginLeft: "8px",
                  height: "100%",
                  textTransform: "none",
                  backgroundColor: "primary.main",
                  ":hover": {
                    boxShadow: "none",
                    backgroundColor: "primary.main",
                  },
                }}
                disableRipple
              >
                <MuiTypography variant="body2">Save</MuiTypography>
              </MuiButton>
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                sx={{
                  height: "100%",
                  boxShadow: "none",
                  marginLeft: "8px",
                  textTransform: "none",
                  ":hover": { boxShadow: "none" },
                }}
                onClick={handleCancel}
                disableRipple
              >
                <MuiTypography variant="body2">Cancel</MuiTypography>
              </MuiButton>
            </MuiGrid>
          </Fragment>
        )}
      </MuiGrid>
    </Fragment>
  );
};

export default AddComment;

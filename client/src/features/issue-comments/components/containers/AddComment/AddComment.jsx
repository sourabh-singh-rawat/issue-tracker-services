import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";

import SaveButton from "../../../../../common/buttons/SaveButton";
import TextField from "../../../../../common/textfields/TextField";
import CancelButton from "../../../../../common/buttons/CancelButton";

import { useCreateIssueCommentMutation } from "../../../api/issue-comments.api";
import { setLoadingComments } from "../../../slice/issue-comments.slice";

const AddComment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const [commentBoxSelected, setCommentBoxSelected] = useState(false);

  const [formFields, setFormFields] = useState({ description: "" });

  const [createComment, { isSuccess }] = useCreateIssueCommentMutation();

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
      <MuiGrid container columnSpacing={1}>
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
                    {user.displayName.match(/\b(\w)/g)[0]}
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
              <SaveButton label="Create" onClick={handleSave} />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton label="Cancel" onClick={handleCancel} />
            </MuiGrid>
          </Fragment>
        )}
      </MuiGrid>
    </Fragment>
  );
};

export default AddComment;

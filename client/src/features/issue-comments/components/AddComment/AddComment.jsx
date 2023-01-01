import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MuiAvatar from '@mui/material/Avatar';
import MuiGrid from '@mui/material/Grid';
import MuiInputAdornment from '@mui/material/InputAdornment';

import CancelButton from '../../../../common/CancelButton';
import SaveButton from '../../../../common/SaveButton';
import TextField from '../../../../common/TextField';

import { setLoadingComments } from '../../issue-comments.slice';
import { useCreateIssueCommentMutation } from '../../issue-comments.api';

function AddComment() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const [commentBoxSelected, setCommentBoxSelected] = useState(false);

  const [formFields, setFormFields] = useState({ description: '' });

  const [createComment] = useCreateIssueCommentMutation();

  const handleChange = (e) => {
    const { value } = e.target;

    setFormFields({
      ...formFields,
      description: value,
    });
  };

  const handleSave = () => {
    if (formFields.description.length > 0) {
      const { description } = formFields;

      createComment({ issueId: id, description });
      dispatch(setLoadingComments());

      setFormFields({ description: '' });
    }
    setCommentBoxSelected(false);
  };

  const handleCancel = () => {
    setCommentBoxSelected(false);
    setFormFields({ description: '' });
  };

  return (
    <MuiGrid columnSpacing={1} container>
      <MuiGrid flexGrow={1} item>
        <TextField
          InputProps={{
            startAdornment: (
              <MuiInputAdornment position="start">
                <MuiAvatar
                  src={user.photoURL}
                  sx={{ width: '24px', height: '24px', fontSize: '14px' }}
                >
                  {user.displayName.match(/\b(\w)/g)[0]}
                </MuiAvatar>
              </MuiInputAdornment>
            ),
          }}
          placeholder="Add Comment"
          size="small"
          value={formFields.description}
          fullWidth
          onChange={handleChange}
          onClick={() => setCommentBoxSelected(true)}
        />
      </MuiGrid>
      {commentBoxSelected && (
        <>
          <MuiGrid item>
            <SaveButton label="Create" onClick={handleSave} />
          </MuiGrid>
          <MuiGrid item>
            <CancelButton label="Cancel" onClick={handleCancel} />
          </MuiGrid>
        </>
      )}
    </MuiGrid>
  );
}

export default AddComment;

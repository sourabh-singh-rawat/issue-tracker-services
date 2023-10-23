import { useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";

import MuiAvatar from "@mui/material/Avatar";
import MuiGrid from "@mui/material/Grid";
import MuiInputAdornment from "@mui/material/InputAdornment";
import MuiContainer from "@mui/material/Container";

import { setLoadingComments } from "../../issue-comments.slice";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import CancelButton from "../../../../common/components/CancelButton";
import { useCreateIssueCommentMutation } from "../../../../api/generated/issue.api";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../../../common/components/forms/TextField";

function AddComment() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const defaultValues = useMemo(
    () => ({
      description: "",
    }),
    [],
  );

  const { control, formState, handleSubmit, setFocus } = useForm({
    defaultValues,
    mode: "all",
  });

  const user = useAppSelector((store) => store.auth.currentUser);
  const [commentBoxSelected, setCommentBoxSelected] = useState(false);

  const [formFields, setFormFields] = useState({ description: "" });

  const [createComment] = useCreateIssueCommentMutation();

  const handleChange = (e) => {
    const { value } = e.target;

    setFormFields({
      ...formFields,
      description: value,
    });
  };

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    description,
  }) => {
    if (description.length > 0) {
      await createComment({ id, body: { description } });
      dispatch(setLoadingComments());

      setFormFields({ description: "" });
    }
    setCommentBoxSelected(false);
  };

  const handleCancel = () => {
    setCommentBoxSelected(false);
    setFormFields({ description: "" });
  };

  useEffect(() => {
    console.log();
  }, [formState]);

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid columnSpacing={1} container>
        <MuiGrid flexGrow={1} item>
          <TextField
            name="description"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        {
          <>
            <MuiGrid item>
              <PrimaryButton label="Create" type="submit" />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton label="Cancel" onClick={handleCancel} />
            </MuiGrid>
          </>
        }
      </MuiGrid>
    </MuiContainer>
  );
}

export default AddComment;

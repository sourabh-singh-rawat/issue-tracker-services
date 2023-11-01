import { useParams } from "react-router-dom";
import React, { useMemo, useState } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";

import { setLoadingComments } from "../../issue-comments.slice";
import { useAppDispatch } from "../../../../common/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import CancelButton from "../../../../common/components/CancelButton";
import { useCreateIssueCommentMutation } from "../../../../api/generated/issue.api";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../../../common/components/forms/TextField";

export default function AddComment() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const defaultValues = useMemo(() => ({ description: "" }), []);
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "all",
  });
  const [createComment] = useCreateIssueCommentMutation();

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    description,
  }) => {
    if (description.length > 0) {
      await createComment({ id, body: { description } });
      dispatch(setLoadingComments());
      reset();
    }
    setIsFocused(false);
  };

  const handleCancel = () => {
    setIsFocused(false);
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid columnSpacing={1} container>
        <MuiGrid flexGrow={1} onClick={() => setIsFocused(true)} item>
          <TextField
            name="description"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        {isFocused && (
          <>
            <MuiGrid item display="flex">
              <PrimaryButton label="Post" type="submit" />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton label="Cancel" onClick={handleCancel} />
            </MuiGrid>
          </>
        )}
      </MuiGrid>
    </MuiContainer>
  );
}

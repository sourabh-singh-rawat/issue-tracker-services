import { useParams } from "react-router-dom";
import React, { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useTheme } from "@mui/material";
import { useAppSelector } from "../../../../common/hooks";
import { useCreateIssueCommentMutation } from "../../../../api/generated/issue.api";

import MuiContainer from "@mui/material/Container";
import Avatar from "../../../../common/components/Avatar";
import TextField from "../../../../common/components/forms/TextField";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton";
import SendIcon from "@mui/icons-material/Send";

import MuiInputAdornment from "@mui/material/InputAdornment";

export default function AddComment() {
  const theme = useTheme();
  const { id } = useParams();
  const currentUser = useAppSelector(({ auth }) => auth.currentUser);
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
      reset();
    }
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <TextField
        name="description"
        placeholder="Add a comment..."
        control={control}
        formState={formState}
        startAdornment={
          <MuiInputAdornment position="start">
            <Avatar
              label={currentUser?.displayName}
              width={theme.spacing(3)}
              height={theme.spacing(3)}
            />
          </MuiInputAdornment>
        }
        endAdornment={
          <MuiInputAdornment position="end">
            <StyledIconButton
              disabled={!formState.isDirty}
              sx={{
                width: theme.spacing(4),
                height: theme.spacing(4),
                color: theme.palette.primary.main,
              }}
              type="submit"
              disableRipple
            >
              <SendIcon />
            </StyledIconButton>
          </MuiInputAdornment>
        }
      />
    </MuiContainer>
  );
}

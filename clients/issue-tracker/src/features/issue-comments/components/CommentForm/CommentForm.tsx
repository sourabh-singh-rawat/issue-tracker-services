import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useTheme } from "@mui/material";
import { useCreateIssueCommentMutation } from "../../../../api/generated/issue.api";
import { useAppSelector } from "../../../../common/hooks";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import Avatar from "../../../../common/components/Avatar";
import TextField from "../../../../common/components/forms/TextField";

import MuiInputAdornment from "@mui/material/InputAdornment";
import CancelButton from "../../../../common/components/CancelButton";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

export default function CommentForm() {
  const theme = useTheme();
  const { id } = useParams();
  const currentUser = useAppSelector(({ auth }) => auth.current);
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
      <MuiGrid columnSpacing={1} container>
        <MuiGrid flexGrow={1} item>
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
          />
        </MuiGrid>
        {formState.isDirty && (
          <>
            <MuiGrid display="flex" item>
              <PrimaryButton label="Save" type="submit" />
            </MuiGrid>
            <MuiGrid display="flex" item>
              <CancelButton label="Cancel" onClick={() => reset()} />
            </MuiGrid>
          </>
        )}
      </MuiGrid>
    </MuiContainer>
  );
}

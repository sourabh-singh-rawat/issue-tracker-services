import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";
import TextField from "../../../../common/components/forms/TextField";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import {
  CreateListInput,
  useCreateListMutation,
} from "../../../../api/codegen/gql/graphql";
import { useMessageBar } from "../../../message-bar/hooks";

interface ListFormProps {
  spaceId: string;
}

export default function ListForm({ spaceId }: ListFormProps) {
  const navigate = useNavigate();
  const messageBar = useMessageBar();
  const [createList] = useCreateListMutation({
    onCompleted({ createList }) {
      messageBar.showSuccess("Created list successfully");
      setTimeout(() => {
        navigate(`/lists/${createList}/overview`);
      }, 5000);
    },
    onError(error) {
      messageBar.showError(error.message);
    },
  });

  const defaultValues: CreateListInput = useMemo(
    () => ({ name: "", spaceId }),
    [],
  );
  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateListInput> = async ({ name }) => {
    await createList({ variables: { input: { name, spaceId } } });
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <Grid2 spacing={2} container>
        <Grid2 size={12}>
          <TextField
            name="name"
            title="Name"
            control={control}
            formState={formState}
            placeholder="e.g. Marketing, Engineering, HR"
          />
        </Grid2>
        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Create" />
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
}

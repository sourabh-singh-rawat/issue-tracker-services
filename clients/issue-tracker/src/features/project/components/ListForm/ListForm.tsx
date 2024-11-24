import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";
import TextField from "../../../../common/components/forms/TextField";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import {
  CreateListInput,
  useCreateListMutation,
} from "../../../../api/codegen/gql/graphql";

export default function ListForm() {
  const navigate = useNavigate();
  const [createList] = useCreateListMutation({
    onCompleted({ createList }) {
      navigate(`/projects/${createList}/overview`);
    },
  });

  const defaultValues: CreateListInput = useMemo(
    () => ({ name: "", description: "" }),
    [],
  );
  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateListInput> = async ({
    name,
    description,
  }) => {
    await createList({ variables: { input: { name, description } } });
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid spacing={2} container>
        <MuiGrid item xs={12}>
          <MuiTypography variant="h4" fontWeight="bold">
            New List
          </MuiTypography>
          <MuiTypography variant="body1">
            List are container for storing items
          </MuiTypography>
        </MuiGrid>

        <MuiGrid item xs={12}>
          <TextField
            name="name"
            title="Name"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="description"
            title="Description"
            control={control}
            formState={formState}
            rows={4}
          />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <PrimaryButton type="submit" label="Create" />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

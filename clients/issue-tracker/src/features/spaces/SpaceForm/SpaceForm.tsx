import { SubmitHandler, useForm } from "react-hook-form";

import { Container, Grid2 } from "@mui/material";
import {
  CreateSpaceInput,
  useCreateSpaceMutation,
} from "../../../api/codegen/gql/graphql";
import { useSnackbar } from "../../../common/components/Snackbar/hooks";
import PrimaryButton from "../../../common/components/buttons/PrimaryButton";
import TextField from "../../../common/components/forms/TextField";

interface SpaceFormProps {
  workspaceId: string;
}

export function SpaceForm({ workspaceId }: SpaceFormProps) {
  const messageBar = useSnackbar();
  const [createSpace] = useCreateSpaceMutation({
    onCompleted() {
      messageBar.success("Space created successfully");
    },
    onError() {
      messageBar.error("Failed to create space");
    },
  });
  const { control, formState, handleSubmit } = useForm<CreateSpaceInput>();

  const onSubmit: SubmitHandler<CreateSpaceInput> = async ({
    name,
    description,
  }) => {
    await createSpace({
      variables: { input: { name, description, workspaceId } },
    });
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <Grid2 container rowSpacing={2}>
        <Grid2 size={12}>
          <TextField
            name="name"
            title="Name"
            placeholder="Name"
            control={control}
            formState={formState}
            autoFocus
          />
        </Grid2>

        <Grid2 size={12}>
          <TextField
            name="description"
            title="Description"
            placeholder="Description"
            control={control}
            formState={formState}
            autoFocus
            rows={4}
          />
        </Grid2>

        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Create" />
        </Grid2>
      </Grid2>
    </Container>
  );
}

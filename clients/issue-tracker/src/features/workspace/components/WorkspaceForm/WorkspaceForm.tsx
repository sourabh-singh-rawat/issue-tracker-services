import { SubmitHandler, useForm } from "react-hook-form";

import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";

import {
  CreateWorkspaceInput,
  useCreateWorkspaceMutation,
} from "../../../../api/codegen/gql/graphql";
import ModalFooter from "../../../../common/components/ModalFooter";
import { TextField } from "../../../../common/components/forms";

interface WorkspaceFormProps {
  handleClose: () => void;
}

export default function WorkspaceForm({ handleClose }: WorkspaceFormProps) {
  const [createWorkspace] = useCreateWorkspaceMutation();

  const form = useForm<CreateWorkspaceInput>({
    defaultValues: { name: "", description: "" },
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateWorkspaceInput> = async ({
    name,
    description,
  }) => {
    await createWorkspace({ variables: { input: { name, description } } });
    handleClose();
  };

  return (
    <Container
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      disableGutters
    >
      <Grid2 rowSpacing={3} container>
        <Grid2 size={12}>
          <TextField
            name="name"
            title="Name"
            placeholder="Name"
            form={form}
            autoFocus
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="description"
            title="Description"
            placeholder="Description"
            rows={4}
            form={form}
          />
        </Grid2>
      </Grid2>
      <ModalFooter handleClose={handleClose} />
    </Container>
  );
}

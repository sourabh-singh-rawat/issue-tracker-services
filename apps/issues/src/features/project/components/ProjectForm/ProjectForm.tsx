import MuiContainer from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { CreateProjectInput } from "@generated/gql/graphql";
import { useCreateProjectMutation } from "@generated/gql";
import { PrimaryButton, TextField, useSnackbar } from "@common";

interface ProjectFormProps {
  workspaceId: string;
}

export const ProjectForm = ({ workspaceId }: ProjectFormProps) => {
  const messageBar = useSnackbar();
  const { mutateAsync: createProject } = useCreateProjectMutation();

  const defaultValues: CreateProjectInput = useMemo(
    () => ({ name: "", workspaceId }),
    [workspaceId],
  );
  const form = useForm({
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateProjectInput> = async ({ name }) => {
    try {
      await createProject({
        input: { name, workspaceId },
      });
      messageBar.success("Created project successfully");
      // Reload so the new project appears in the sidebar list
      window.location.reload();
    } catch (error) {
      messageBar.error(error instanceof Error ? error.message : "Failed to create project");
    }
  };

  return (
    <MuiContainer component="form" onSubmit={form.handleSubmit(onSubmit)} disableGutters>
      <Grid2 spacing={2} container>
        <Grid2 size={12}>
          <TextField
            name="name"
            label="Name"
            form={form}
            placeholder="e.g. Unity Game, Tools, Website"
          />
        </Grid2>
        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Create" />
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
};

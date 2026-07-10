import MuiContainer from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import type { CreateListInput } from "@generated/gql/graphql";
import { useCreateListMutation } from "@generated/gql";
import { PrimaryButton, TextField, useSnackbar } from "@common";

interface ListFormProps {
  spaceId: string;
}

export const ListForm = ({ spaceId }: ListFormProps) => {
  const navigate = useNavigate();
  const messageBar = useSnackbar();
  const { mutateAsync: createList } = useCreateListMutation();

  const defaultValues: CreateListInput = useMemo(
    () => ({ name: "", spaceId }),
    [spaceId],
  );
  const form = useForm({
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateListInput> = async ({ name }) => {
    try {
      const { createList: listId } = await createList({
        input: { name, spaceId },
      });
      messageBar.success("Created list successfully");
      setTimeout(() => {
        navigate({
          to: `/lists/${listId}/overview` as "/me",
        });
      }, 5000);
    } catch (error) {
      messageBar.error(
        error instanceof Error ? error.message : "Failed to create list",
      );
    }
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      disableGutters
    >
      <Grid2 spacing={2} container>
        <Grid2 size={12}>
          <TextField
            name="name"
            label="Name"
            form={form}
            placeholder="e.g. Marketing, Engineering, HR"
          />
        </Grid2>
        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Create" />
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
};

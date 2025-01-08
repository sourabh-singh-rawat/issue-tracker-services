import MuiContainer from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CreateListInput,
  useCreateListMutation,
} from "../../../../api/codegen/gql/graphql";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { TextField } from "../../../../common/components/forms";

interface ListFormProps {
  spaceId: string;
}

export const ListForm = ({ spaceId }: ListFormProps) => {
  const navigate = useNavigate();
  const messageBar = useSnackbar();
  const [createList] = useCreateListMutation({
    onCompleted({ createList }) {
      messageBar.success("Created list successfully");
      setTimeout(() => {
        navigate(`/lists/${createList}/overview`);
      }, 5000);
    },
    onError(error) {
      messageBar.error(error.message);
    },
  });

  const defaultValues: CreateListInput = useMemo(
    () => ({ name: "", spaceId }),
    [],
  );
  const form = useForm({
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateListInput> = async ({ name }) => {
    await createList({ variables: { input: { name, spaceId } } });
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

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getCurrentUserQueryKey } from "@generated/api/@tanstack/react-query.gen";
import { useUpdateProfileGenderMutation } from "@generated/gql/hooks";
import { Form, FormItem, getErrorMessage, useSnackbar } from "@shared/ui";
import { GenderRadioGroup } from "../GenderRadioGroup";

type GenderValue = "MALE" | "FEMALE" | "UNSPECIFIED";

const isGenderValue = (value: string | null | undefined): value is GenderValue =>
  value === "MALE" || value === "FEMALE" || value === "UNSPECIFIED";

type UpdateGenderFormProps = {
  gender?: string | null;
};

export const UpdateGenderForm = ({ gender }: UpdateGenderFormProps) => {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateProfileGenderMutation = useUpdateProfileGenderMutation();

  const form = useForm({
    defaultValues: {
      gender: isGenderValue(gender) ? gender : "",
    },
    onSubmit: async ({ value }) => {
      if (!isGenderValue(value.gender)) {
        snackbar.error("Select a gender.");
        return;
      }

      try {
        await updateProfileGenderMutation.mutateAsync({
          input: {
            gender: value.gender,
          },
        });
        await queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
        snackbar.success("Gender updated.");
        await navigate({ to: "/" });
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Could not update your gender. Please try again."));
      }
    },
  });

  return (
    <Form form={form}>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          px: 3,
          py: 2,
        }}
      >
        <FormItem name="gender">
          <GenderRadioGroup />
        </FormItem>
      </Paper>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained" disabled={updateProfileGenderMutation.isPending}>
          {updateProfileGenderMutation.isPending ? "Saving…" : "Save"}
        </Button>
      </Stack>
    </Form>
  );
};

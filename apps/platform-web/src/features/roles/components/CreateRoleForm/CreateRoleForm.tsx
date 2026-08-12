import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useCreatePlatformRoleMutation } from "@generated/gql";
import { PrimaryButton, SecondaryButton, TextField } from "@pine/ui";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";

export type CreateRoleFormValues = {
  key: string;
  name: string;
  description: string;
};

export type CreateRoleFormProps = {
  onSuccess?: (roleId: string | null | undefined) => void;
  onCancel?: () => void;
};

const defaultValues: CreateRoleFormValues = {
  key: "",
  name: "",
  description: "",
};

const requiredString = (value: string, label: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return `${label} is required`;
  }
  return undefined;
};

export const CreateRoleForm = ({ onSuccess, onCancel }: CreateRoleFormProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const createRoleMutation = useCreatePlatformRoleMutation();

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const result = await createRoleMutation.mutateAsync({
          input: {
            key: value.key.trim(),
            name: value.name.trim(),
            description: value.description.trim() || undefined,
          },
        });

        await queryClient.invalidateQueries({ queryKey: ["GetPlatformRoles"] });
        snackbar.success("Platform role created successfully");
        form.reset();
        onSuccess?.(result.createPlatformRole?.id);
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Failed to create platform role"));
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <Stack spacing={2}>
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => requiredString(value, "Name"),
          }}
        >
          {(field) => (
            <TextField field={field} label="Name" placeholder="e.g. Platform Operator" autoFocus />
          )}
        </form.Field>

        <form.Field
          name="key"
          validators={{
            onChange: ({ value }) => {
              const missing = requiredString(value, "Key");
              if (missing) {
                return missing;
              }
              if (!/^[a-z][a-z0-9._-]*$/i.test(value.trim())) {
                return "Use letters, numbers, dots, underscores, or hyphens";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <TextField
              field={field}
              label="Key"
              placeholder="e.g. platform.operator"
              description="Stable identifier for this platform role."
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextField
              field={field}
              label="Description"
              placeholder="Optional short description"
              rows={3}
            />
          )}
        </form.Field>

        <Stack direction="row-reverse" spacing={1} sx={{ pt: 1, alignItems: "center" }}>
          <form.Subscribe
            selector={(state): [boolean, boolean] => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <PrimaryButton
                type="submit"
                label="Create"
                loading={isSubmitting || createRoleMutation.isPending}
                isDisabled={!canSubmit || isSubmitting || createRoleMutation.isPending}
              />
            )}
          </form.Subscribe>
          {onCancel ? (
            <SecondaryButton
              type="button"
              label="Cancel"
              onClick={() => {
                onCancel();
              }}
            />
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
};

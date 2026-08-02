import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useCreateOrganizationMutation } from "@generated/gql";
import { PrimaryButton, SecondaryButton, TextField } from "@pine/ui";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";

export type CreateOrganizationFormValues = {
  name: string;
  slug: string;
  description: string;
};

export type CreateOrganizationFormProps = {
  onSuccess?: (organizationId: string | null | undefined) => void;
  onCancel?: () => void;
};

const defaultValues: CreateOrganizationFormValues = {
  name: "",
  slug: "",
  description: "",
};

function requiredString(value: string, label: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return `${label} is required`;
  }
  return undefined;
}

export const CreateOrganizationForm = ({
  onSuccess,
  onCancel,
}: CreateOrganizationFormProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const createOrganizationMutation = useCreateOrganizationMutation();

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const result = await createOrganizationMutation.mutateAsync({
          input: {
            name: value.name.trim(),
            slug: value.slug.trim(),
            description: value.description.trim() || undefined,
          },
        });

        await queryClient.invalidateQueries({ queryKey: ["GetOrganizations"] });
        snackbar.success("Organization created successfully");
        form.reset();
        onSuccess?.(result.createOrganization?.id);
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Failed to create organization"));
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
            <TextField field={field} label="Name" placeholder="e.g. Acme Corp" autoFocus />
          )}
        </form.Field>

        <form.Field
          name="slug"
          validators={{
            onChange: ({ value }) => {
              const missing = requiredString(value, "Slug");
              if (missing) {
                return missing;
              }
              if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.trim())) {
                return "Use lowercase letters, numbers, and hyphens";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <TextField
              field={field}
              label="Slug"
              placeholder="e.g. acme-corp"
              description="URL-safe identifier for the organization."
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
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <PrimaryButton
                type="submit"
                label="Create"
                loading={isSubmitting || createOrganizationMutation.isPending}
                isDisabled={!canSubmit || isSubmitting || createOrganizationMutation.isPending}
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

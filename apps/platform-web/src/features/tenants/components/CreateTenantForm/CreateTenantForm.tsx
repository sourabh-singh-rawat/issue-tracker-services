import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useCreateTenantMutation } from "@generated/gql";
import { PLATFORM_OBJECT_ID } from "@pine/authorization";
import { PrimaryButton, SecondaryButton, TextField } from "@pine/ui";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";

export type CreateTenantFormValues = {
  name: string;
  slug: string;
  description: string;
};

export type CreateTenantFormProps = {
  onSuccess?: (tenantId: string | null | undefined) => void;
  onCancel?: () => void;
};

const defaultValues: CreateTenantFormValues = {
  name: "",
  slug: "",
  description: "",
};

const requiredString = (value: string, label: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return `${label} is required`;
  }
  return undefined;
};

export const CreateTenantForm = ({ onSuccess, onCancel }: CreateTenantFormProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const createTenantMutation = useCreateTenantMutation();

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const result = await createTenantMutation.mutateAsync({
          input: {
            platformId: PLATFORM_OBJECT_ID,
            name: value.name.trim(),
            slug: value.slug.trim(),
            description: value.description.trim() || undefined,
          },
        });

        await queryClient.invalidateQueries({ queryKey: ["GetTenants"] });
        snackbar.success("Tenant created successfully");
        form.reset();
        onSuccess?.(result.createTenant?.id);
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Failed to create tenant"));
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
              description="URL-safe identifier for the tenant."
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
                loading={isSubmitting || createTenantMutation.isPending}
                isDisabled={!canSubmit || isSubmitting || createTenantMutation.isPending}
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

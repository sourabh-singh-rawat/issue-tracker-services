import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useCreateRoleMutation, useGetCapabilitiesQuery } from "@generated/gql";
import { PrimaryButton, SecondaryButton, TextField } from "@pine/ui";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import { CapabilityMultiSelect } from "../CapabilityMultiSelect";

export type CreateRoleFormValues = {
  key: string;
  name: string;
  description: string;
  capabilityKeys: string[];
};

export type CreateRoleFormProps = {
  onSuccess?: (roleId: string | null | undefined) => void;
  onCancel?: () => void;
};

const defaultValues: CreateRoleFormValues = {
  key: "",
  name: "",
  description: "",
  capabilityKeys: [],
};

function requiredString(value: string, label: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return `${label} is required`;
  }
  return undefined;
}

export const CreateRoleForm = ({ onSuccess, onCancel }: CreateRoleFormProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const createRoleMutation = useCreateRoleMutation();
  const capabilitiesQuery = useGetCapabilitiesQuery(undefined, {
    select: (data) =>
      (data.getCapabilities ?? [])
        .filter((capability): capability is typeof capability & { key: string } =>
          Boolean(capability.key),
        )
        .map((capability) => ({
          key: capability.key,
          service: capability.service ?? null,
          resource: capability.resource ?? null,
          action: capability.action ?? null,
        })),
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const result = await createRoleMutation.mutateAsync({
          input: {
            key: value.key.trim(),
            name: value.name.trim(),
            description: value.description.trim() || undefined,
            capabilityKeys:
              value.capabilityKeys.length > 0 ? value.capabilityKeys : undefined,
          },
        });

        await queryClient.invalidateQueries({ queryKey: ["GetRoles"] });
        snackbar.success("Role created successfully");
        form.reset();
        onSuccess?.(result.createRole?.id);
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Failed to create role"));
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
            <TextField field={field} label="Name" placeholder="e.g. Project Manager" autoFocus />
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
              placeholder="e.g. custom.project_manager"
              description="Stable identifier used in authorization checks."
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

        <form.Field name="capabilityKeys">
          {(field) => (
            <CapabilityMultiSelect
              capabilities={capabilitiesQuery.data ?? []}
              value={field.state.value}
              onChange={(keys) => {
                field.handleChange(keys);
              }}
              isLoading={capabilitiesQuery.isPending}
              isError={capabilitiesQuery.isError}
              error={capabilitiesQuery.error}
              disabled={createRoleMutation.isPending}
            />
          )}
        </form.Field>

        <Stack direction="row-reverse" spacing={1} sx={{ pt: 1, alignItems: "center" }}>
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
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

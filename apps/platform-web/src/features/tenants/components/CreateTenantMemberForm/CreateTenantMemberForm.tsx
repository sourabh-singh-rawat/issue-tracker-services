import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  useCreateTenantMemberMutation,
  useGetIdentitiesQuery,
  useGetTenantRolesQuery,
} from "@generated/gql";
import { PrimaryButton, SecondaryButton, TextField } from "@pine/ui";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, useSnackbar } from "@shared/ui";

export type CreateTenantMemberFormValues = {
  identityId: string;
  roleId: string;
  reason: string;
};

export type CreateTenantMemberFormProps = {
  tenantId: string;
  onSuccess?: (memberId: string | null | undefined) => void;
  onCancel?: () => void;
};

const defaultValues: CreateTenantMemberFormValues = {
  identityId: "",
  roleId: "",
  reason: "",
};

const requiredString = (value: string, label: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return `${label} is required`;
  }
  return undefined;
};

export const CreateTenantMemberForm = ({
  tenantId,
  onSuccess,
  onCancel,
}: CreateTenantMemberFormProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const createTenantMemberMutation = useCreateTenantMemberMutation();
  const rolesQuery = useGetTenantRolesQuery(
    { tenantId },
    {
      select: (data) => data.getTenantRoles ?? [],
      enabled: Boolean(tenantId),
    },
  );
  const identitiesQuery = useGetIdentitiesQuery(undefined, {
    select: (data) => data.getIdentities ?? [],
  });

  const roles = rolesQuery.data ?? [];
  const identities = identitiesQuery.data ?? [];

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const result = await createTenantMemberMutation.mutateAsync({
          input: {
            tenantId,
            identityId: value.identityId.trim(),
            roleId: value.roleId.trim(),
            reason: value.reason.trim() || undefined,
          },
        });

        await queryClient.invalidateQueries({ queryKey: ["GetTenantMembers"] });
        snackbar.success("Tenant member created successfully");
        form.reset();
        onSuccess?.(result.createTenantMember?.id);
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Failed to create tenant member"));
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
          name="identityId"
          validators={{
            onChange: ({ value }) => requiredString(value, "Identity"),
          }}
        >
          {(field) => (
            <Box>
              <Typography variant="body2" sx={{ pb: 1, fontWeight: 500 }}>
                Identity
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  displayEmpty
                  autoFocus
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                  }}
                  disabled={identitiesQuery.isPending}
                >
                  <MenuItem value="">
                    <em>Select an identity</em>
                  </MenuItem>
                  {identities.map((identity) => {
                    const id = identity.id;
                    if (!id) {
                      return null;
                    }
                    return (
                      <MenuItem key={id} value={id}>
                        {identity.displayName ?? id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {identitiesQuery.isError ? (
                <Typography variant="body1" color="error" sx={{ mt: 1 }}>
                  {getErrorMessage(identitiesQuery.error, "Failed to load identities")}
                </Typography>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Choose the identity to assign as a member of this tenant.
                </Typography>
              )}
            </Box>
          )}
        </form.Field>

        <form.Field
          name="roleId"
          validators={{
            onChange: ({ value }) => requiredString(value, "Role"),
          }}
        >
          {(field) => (
            <Box>
              <Typography variant="body2" sx={{ pb: 1, fontWeight: 500 }}>
                Role
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  displayEmpty
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                  }}
                  disabled={rolesQuery.isPending}
                >
                  <MenuItem value="">
                    <em>Select a role</em>
                  </MenuItem>
                  {roles.map((role) => {
                    const id = role.id;
                    if (!id) {
                      return null;
                    }
                    return (
                      <MenuItem key={id} value={id}>
                        {role.name ?? role.key ?? id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {rolesQuery.isError ? (
                <Typography variant="body1" color="error" sx={{ mt: 1 }}>
                  {getErrorMessage(rolesQuery.error, "Failed to load tenant roles")}
                </Typography>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Choose a tenant role for this member.
                </Typography>
              )}
            </Box>
          )}
        </form.Field>

        <form.Field name="reason">
          {(field) => (
            <TextField
              field={field}
              label="Reason"
              placeholder="Optional assignment reason"
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
                loading={isSubmitting || createTenantMemberMutation.isPending}
                isDisabled={!canSubmit || isSubmitting || createTenantMemberMutation.isPending}
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

import React, { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

import { TextField } from "../../../../shared/components/forms/TextField";

import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";

import PrimaryButton from "../../../../shared/components/buttons/PrimaryButton";
import WorkspaceRoleSelector from "../WorkspaceMemberSelector/WorkspaceRoleSelector";
import EmailIcon from "@mui/icons-material/Email";

type InviteForm = {
  email: string;
  workspaceRole: string;
};

export default function WorkspaceMemberForm() {
  const { id } = useParams({ strict: false }) as { id?: string };
  // TODO: wire to GraphQL once workspace invite/role queries exist
  const roleOptions: { id: string; name: string }[] = [];
  const isLoading = false;

  const defaultValues = useMemo(() => ({ email: "", workspaceRole: "" }) as InviteForm, []);

  const form = useForm<InviteForm>({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<InviteForm> = async ({ email, workspaceRole }) => {
    if (!id) return;
    // await createWorkspaceInvite({ id, body: { email, workspaceRole } });
    void email;
    void workspaceRole;
  };

  return (
    <MuiContainer component="form" onSubmit={form.handleSubmit(onSubmit)} disableGutters>
      <MuiGrid spacing={2} container>
        <MuiGrid item xs={8}>
          <TextField name="email" label="Email" form={form} />
        </MuiGrid>
        <MuiGrid item xs={4}>
          <WorkspaceRoleSelector
            name="workspaceRole"
            title="Workspace role"
            control={form.control}
            formState={form.formState}
            options={roleOptions}
          />
        </MuiGrid>

        <MuiGrid xs={12} item>
          <PrimaryButton
            label="Send Invite"
            type="submit"
            startIcon={<EmailIcon />}
            loading={isLoading}
          />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

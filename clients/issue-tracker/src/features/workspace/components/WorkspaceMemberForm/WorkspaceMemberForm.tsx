import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import TextField from "../../../../common/components/forms/TextField";
import {
  useCreateWorkspaceInviteMutation,
  useGetWorkspaceRoleListQuery,
} from "../../../../api/generated/workspace.api";
import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";

import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import WorkspaceRoleSelector from "../WorkspaceMemberSelector/WorkspaceRoleSelector";
import EmailIcon from "@mui/icons-material/Email";

export default function WorkspaceMemberForm() {
  const { id } = useParams();
  const { data: roleList } = useGetWorkspaceRoleListQuery();
  const [createWorkspaceInvite] = useCreateWorkspaceInviteMutation();

  const defaultValues = useMemo(() => ({ email: "", workspaceRole: "" }), []);
  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    // resolver: ajvResolver(defaultSchemas, {
    //   formats: { email: AjvFormats.get("email") },
    // }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    email,
    workspaceRole,
  }) => {
    await createWorkspaceInvite({ id, body: { email, workspaceRole } });
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid spacing={2} container>
        <MuiGrid item xs={8}>
          <TextField
            name="email"
            title="Email"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid item xs={4}>
          <WorkspaceRoleSelector
            name="workspaceRole"
            title="Workspace role"
            control={control}
            formState={formState}
            options={roleList?.rows}
          />
        </MuiGrid>

        <MuiGrid xs={12} item>
          <PrimaryButton
            label="Send Invite"
            type="submit"
            startIcon={<EmailIcon />}
          />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

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
import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";
import schema from "../../../../api/generated/issue-tracker.openapi.json";

export default function WorkspaceMemberForm() {
  const { id } = useParams();
  const { data: roleList } = useGetWorkspaceRoleListQuery();
  const [createWorkspaceInvite, { isLoading }] =
    useCreateWorkspaceInviteMutation();

  const defaultValues = useMemo(() => ({ email: "", workspaceRole: "" }), []);
  const defaultSchemas: any = useMemo(
    () =>
      schema.paths["/api/v1/workspaces/{id}/invite"].post.requestBody.content[
        "application/json"
      ].schema,
    [],
  );
  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: ajvResolver(defaultSchemas, {
      formats: { email: AjvFormats.get("email") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    email,
    workspaceRole,
  }) => {
    if (!id) return;
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
            loading={isLoading}
          />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

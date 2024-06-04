import React, { useEffect, useState } from "react";

import MuiGrid from "@mui/material/Grid";

import Select from "../../../../common/components/Select";
import {
  useGetProjectRoleListQuery,
  useCreateProjectInviteMutation,
} from "../../../../api/generated/project.api";
import { useSelectedTab } from "../../../../common/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { useMessageBar } from "../../../message-bar/hooks";
import EmailIcon from "@mui/icons-material/Email";
import AppLoader from "../../../../common/components/AppLoader";

interface RoleSelectorProps {
  defaultRole: string;
  inviteStatus: "Accepted" | "Pending";
  userId: string;
  workspaceId: string;
}

export default function RoleSelector({
  defaultRole,
  inviteStatus,
  userId,
  workspaceId,
}: RoleSelectorProps) {
  const { id } = useSelectedTab();
  const { showError, showSuccess } = useMessageBar();
  const [role, setRole] = useState(defaultRole ? defaultRole : "member");
  const { data: projectRoleList } = useGetProjectRoleListQuery({ id });
  const [createProjectInvite, { isSuccess, isLoading, isError, error }] =
    useCreateProjectInviteMutation();

  useEffect(() => {
    if (isSuccess) showSuccess("Successfully added project member");
    if (isError) showError(error?.data?.errors[0]?.message);
  }, [isSuccess, isError]);

  return (
    <>
      {!(inviteStatus == "Accepted" || inviteStatus == "Pending") && (
        <MuiGrid container spacing={1}>
          <MuiGrid item>
            <Select
              name="member"
              value={role ? role : "member"}
              options={projectRoleList?.rows}
              onChange={(e) => setRole(e.target.value)}
            />
          </MuiGrid>
          <MuiGrid item display="flex">
            <PrimaryButton
              label="Invite"
              startIcon={
                isLoading ? (
                  <AppLoader size={2} color="inherit" />
                ) : (
                  <EmailIcon />
                )
              }
              onClick={async () => {
                await createProjectInvite({
                  id,
                  body: { role, userId, workspaceId },
                });
              }}
            />
          </MuiGrid>
        </MuiGrid>
      )}
    </>
  );
}

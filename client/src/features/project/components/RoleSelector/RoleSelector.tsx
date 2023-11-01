import React, { useEffect, useState } from "react";

import MuiGrid from "@mui/material/Grid";

import Select from "../../../../common/components/Select";
import {
  useGetProjectRoleListQuery,
  useCreateProjectMemberMutation,
} from "../../../../api/generated/project.api";
import { useSelectedTab } from "../../../../common/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { useMessageBar } from "../../../message-bar/hooks";
import EmailIcon from "@mui/icons-material/Email";
import AppLoader from "../../../../common/components/AppLoader";

interface RoleSelectorProps {
  defaultRole: string;
  isMember: boolean;
  userId: string;
}

export default function RoleSelector({
  defaultRole,
  isMember,
  userId,
}: RoleSelectorProps) {
  const { id } = useSelectedTab();
  const { showError, showSuccess } = useMessageBar();
  const [role, setRole] = useState(defaultRole ? defaultRole : "member");
  const { data: projectRoleList } = useGetProjectRoleListQuery({ id });
  const [createProjectMember, { isSuccess, isLoading, isError }] =
    useCreateProjectMemberMutation();

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Successfully added project member");
    }

    if (isError) {
      showError("Cannot add project member");
    }
  }, [isSuccess, isError]);

  return (
    <>
      {isMember ? (
        <Select
          value={role ? role : "member"}
          options={projectRoleList?.rows}
          onChange={(e) => setRole(e.target.value)}
          isDisabled={role === "owner"}
        />
      ) : (
        <MuiGrid container spacing={1}>
          <MuiGrid item>
            <Select
              value={role ? role : "member"}
              options={projectRoleList?.rows}
              onChange={(e) => setRole(e.target.value)}
              isDisabled={role === "owner"}
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
                await createProjectMember({
                  id,
                  body: { role, userId: userId },
                });
              }}
            />
          </MuiGrid>
        </MuiGrid>
      )}
    </>
  );
}

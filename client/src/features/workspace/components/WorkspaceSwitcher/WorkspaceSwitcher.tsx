import React, { useState } from "react";

import { useGetAllWorkspacesQuery } from "../../../../api/generated/workspace.api";
import { useAppSelector } from "../../../../common/hooks";

import WorkspaceMenu from "../WorkspaceMenu";
import MenuItem from "../../../../common/components/MenuItem";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import Avatar from "../../../../common/components/Avatar";

interface WorkspaceSwitcherProps {
  isLargeScreen: boolean;
}

export default function WorkspaceSwitcher({
  isLargeScreen,
}: WorkspaceSwitcherProps) {
  const { data } = useGetAllWorkspacesQuery();
  const { id, name } = useAppSelector((store) => store.auth.currentWorkspace);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState({ id, name });

  const handleClickWorkspaceMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div style={{ marginTop: "8px" }}>
      <MenuItem
        avatarIcon={<Avatar label={selectedOption?.name} />}
        label={selectedOption?.name}
        onClick={handleClickWorkspaceMenu}
        indicatorIcon={<UnfoldMoreTwoToneIcon />}
        isMenuGroupOpen={isLargeScreen}
      />
      <WorkspaceMenu
        anchorEl={anchorEl}
        options={data?.data}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleClose={handleClose}
      />
    </div>
  );
}

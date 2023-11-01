import React, { useState } from "react";

import { useGetAllWorkspacesQuery } from "../../../../api/generated/workspace.api";
import { useAppSelector } from "../../../../common/hooks";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";

import { useTheme } from "@mui/material";
import WorkspaceMenu from "../WorkspaceMenu";
import Avatar from "../../../../common/components/Avatar";
import SidebarGroupItem from "../../../../common/components/navigation/SidebarGroupItem";

interface WorkspaceSwitcherProps {
  isLargeScreen: boolean;
}

export default function WorkspaceSwitcher({
  isLargeScreen,
}: WorkspaceSwitcherProps) {
  const theme = useTheme();
  const { data } = useGetAllWorkspacesQuery();
  const { id, name } = useAppSelector((store) => store.auth.currentWorkspace);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState({ id, name });

  const handleClickWorkspaceMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div style={{ marginTop: theme.spacing(1) }}>
      <SidebarGroupItem
        avatarIcon={<Avatar label={selectedOption?.name} />}
        label={selectedOption?.name}
        onClick={handleClickWorkspaceMenu}
        indicatorIcon={<UnfoldMoreTwoToneIcon />}
        isVisible={isLargeScreen}
      />
      <WorkspaceMenu
        anchorEl={anchorEl}
        options={data?.rows}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleClose={handleClose}
      />
    </div>
  );
}

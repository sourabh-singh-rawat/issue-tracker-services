import React, { useState } from "react";

import { useAppSelector } from "../../../../common/hooks";
import { useGetAllWorkspacesQuery } from "../../../../api/generated/workspace.api";

import WorkspaceMenu from "../WorkspaceMenu";
import Avatar from "../../../../common/components/Avatar";
import SidebarGroupItem from "../../../../common/components/navigation/SidebarGroupItem";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";

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
    <>
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
    </>
  );
}

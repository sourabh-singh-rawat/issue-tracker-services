import React, { useState } from "react";

import { useAppSelector } from "../../../../common/hooks";
import { useGetAllWorkspacesQuery } from "../../../../api/generated/workspace.api";

import WorkspaceMenu from "../WorkspaceMenu";
import Avatar from "../../../../common/components/Avatar";
import SidebarGroupItem from "../../../../common/components/navigation/SidebarGroupItem";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";

interface Props {
  isLargeScreen: boolean;
}

export default function WorkspaceSwitcher({ isLargeScreen }: Props) {
  const { data: workspaces } = useGetAllWorkspacesQuery();
  const { id, name } = useAppSelector(({ auth }) => auth.currentWorkspace);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState({ id, name });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <SidebarGroupItem
        icon={<Avatar label={selectedOption?.name} />}
        title={selectedOption?.name}
        onClick={handleClick}
        indicatorIcon={<UnfoldMoreTwoToneIcon />}
        isVisible={isLargeScreen}
      />
      <WorkspaceMenu
        anchorEl={anchorEl}
        options={workspaces?.rows}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleClose={handleClose}
      />
    </>
  );
}

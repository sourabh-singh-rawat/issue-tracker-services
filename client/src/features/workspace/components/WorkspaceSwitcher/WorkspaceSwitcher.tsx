import React, { useState } from "react";

import MuiDivider from "@mui/material/Divider";
import MuiAddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import MenuItem from "../../../../common/components/MenuItem";
import { useGetAllWorkspacesQuery } from "../../../../api/generated/workspace.api";
import { useAppSelector } from "../../../../common/hooks";
import WorkspaceModal from "../WorkspaceModal";

import WorkspaceMenu from "../WorkspaceMenu";
import WorkspaceList from "../WorkspaceList";
import WorkspaceSelector from "../WorkspaceSelector";

interface WorkspaceSwitcherProps {
  isLargeScreen: boolean;
}

export default function WorkspaceSwitcher({
  isLargeScreen,
}: WorkspaceSwitcherProps) {
  const { data } = useGetAllWorkspacesQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useAppSelector((store) => store.auth.currentUser);
  const [selectedOption, setSelectedOption] = useState({
    id: currentUser?.defaultWorkspaceId,
    name: currentUser?.defaultWorkspaceName,
  });

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <WorkspaceSelector
        label={selectedOption?.name}
        isLargeScreen={isLargeScreen}
        onClickShowWorkspaces={handleClickListItem}
      />
      <WorkspaceMenu
        anchorEl={anchorEl}
        options={data?.data}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleClose={handleClose}
      >
        <WorkspaceList
          options={data?.data}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isOpen={open}
          handleClose={handleClose}
        />
        <MuiDivider />
        <MenuItem
          avatarIcon={<MuiAddBoxOutlinedIcon />}
          label="Add new workspace"
          onClick={() => {
            setIsModalOpen(true);
            handleClose();
          }}
        />
        <MenuItem
          avatarIcon={<MuiSettingsOutlinedIcon />}
          label="Manage workspaces"
          onClick={() => {
            handleClose();
          }}
        />
      </WorkspaceMenu>
      <WorkspaceModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

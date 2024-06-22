import React, { useEffect } from "react";

import DoneIcon from "@mui/icons-material/Done";

import AppLoader from "../../../../common/components/AppLoader";
import { useMessageBar } from "../../../message-bar/hooks";

import { useTheme } from "@mui/material";

interface WorkspaceListItemProps {
  option: { name: string; id: string };
  selectedOption: { name: string; id: string } | undefined;
  isOpen: boolean;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  handleClose: () => void;
}

import MenuItem from "../../../../common/components/MenuItem";
import Avatar from "../../../../common/components/Avatar";
import { useSetDefaultWorkspaceMutation } from "../../../../api/generated/user.api";

export default function WorkspaceListItem({
  option,
  selectedOption,
  setSelectedOption,
  handleClose,
}: WorkspaceListItemProps) {
  const theme = useTheme();
  const { id, name } = option;
  const { showSuccess, showError } = useMessageBar();
  const [setDefaultWorkspace, { isLoading, isSuccess, isError }] =
    useSetDefaultWorkspaceMutation();

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Workspace successfully selected");
    }

    if (isError) {
      showError("Failed to select workspace");
    }
  }, [isSuccess]);

  const handleClickSetDefaultWorkspace = async () => {
    if (id === selectedOption?.id) return;

    await setDefaultWorkspace({ body: { id, name } });
    setSelectedOption(option);
    handleClose();
  };

  return (
    <MenuItem
      onClick={handleClickSetDefaultWorkspace}
      avatarIcon={<Avatar label={option.name} />}
      label={option.name}
      indicatorIcon={
        isLoading ? (
          <AppLoader size={1} />
        ) : id === selectedOption?.id ? (
          <DoneIcon
            fontSize="small"
            sx={{ color: theme.palette.success.main }}
          />
        ) : null
      }
    />
  );
}

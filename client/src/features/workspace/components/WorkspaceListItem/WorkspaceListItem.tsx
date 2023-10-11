import React, { useEffect } from "react";

import { useSetDefaultWorkspaceMutation } from "../../../../api/generated/user.api";
import AppLoader from "../../../../common/components/AppLoader";
import { useMessageBar } from "../../../message-bar/hooks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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

export default function WorkspaceListItem({
  option,
  selectedOption,
  setSelectedOption,
  handleClose,
}: WorkspaceListItemProps) {
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

    try {
      await setDefaultWorkspace({ body: { id, name } });
      setSelectedOption(option);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };

  return (
    <MenuItem
      onClick={handleClickSetDefaultWorkspace}
      avatarIcon={<Avatar label={option.name} />}
      label={option.name}
      indicatorIcon={
        isLoading ? (
          <AppLoader size="1rem" />
        ) : id === selectedOption?.id ? (
          <CheckCircleOutlineIcon fontSize="small" color="success" />
        ) : null
      }
    />
  );
}

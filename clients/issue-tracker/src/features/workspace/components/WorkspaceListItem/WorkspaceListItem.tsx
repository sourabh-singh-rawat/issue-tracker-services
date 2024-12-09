import React, { useEffect } from "react";

import DoneIcon from "@mui/icons-material/Done";

import AppLoader from "../../../../common/components/AppLoader";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

import { useTheme } from "@mui/material";

interface WorkspaceListItemProps {
  option: GetWorkspaceApiResponse["rows"];
  selectedOption: GetWorkspaceApiResponse["rows"] | undefined;
  isOpen: boolean;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<GetWorkspaceApiResponse["rows"]>
  >;
  handleClose: () => void;
}

import MenuItem from "../../../../common/components/MenuItem";
import Avatar from "../../../../common/components/Avatar";
// import { useSetDefaultWorkspaceMutation } from "../../../../api/generated/user.api";
import { GetWorkspaceApiResponse } from "../../../../api/generated/workspace.api";

export default function WorkspaceListItem({
  option,
  selectedOption,
  setSelectedOption,
  handleClose,
}: WorkspaceListItemProps) {
  const theme = useTheme();

  if (!option) return "Render Error";

  const { id, name } = option;
  const { showSuccess, showError } = useSnackbar();
  // const [setDefaultWorkspace, { isLoading, isSuccess, isError }] =
  //   useSetDefaultWorkspaceMutation();
  const isLoading = false;

  // useEffect(() => {
  //   if (isSuccess) {
  //     showSuccess("Workspace successfully selected");
  //   }

  //   if (isError) {
  //     showError("Failed to select workspace");
  //   }
  // }, [isSuccess]);

  const handleClickSetDefaultWorkspace = async () => {
    if (id === selectedOption?.id) return;

    // await setDefaultWorkspace({ body: { id, name } });
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

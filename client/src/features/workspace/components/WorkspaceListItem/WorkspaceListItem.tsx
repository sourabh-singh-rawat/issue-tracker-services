import React, { useEffect } from "react";

import MuiAvatar from "@mui/material/Avatar";
import { ListItemButton, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiListItem from "@mui/material/ListItem";
import { useSetDefaultWorkspaceMutation } from "../../../../api/generated/user.api";
import AppLoader from "../../../../common/components/AppLoader";
import { useMessageBar } from "../../../message-bar/hooks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface WorkspaceListItemProps {
  option: { name: string; id: string };
  selectedOption: { name: string; id: string } | undefined;
  isOpen: boolean;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<{ name: string; id: string } | undefined>
  >;
  handleClose: () => void;
}

import MuiListItemText from "@mui/material/ListItemText";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    width: theme.spacing(32),
    paddingRight: theme.spacing(1),
  },
}));

const StyledListItemText = styled(MuiListItemText)(() => {
  return {
    "& .MuiListItemText-primary": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      flexGrow: 1,
    },
  };
});

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  padding: 0,
  margin: 0,
  "&.MuiListItem-root:hover": {
    cursor: "pointer",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
    transition: theme.transitions.create(["backgroundColor"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  "& .MuiListItemSecondaryAction-root": {
    top: "55%",
    marginRight: theme.spacing(1),
  },
}));

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

  console.log(isLoading);

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Workspace successfully selected");
    }

    if (isError) {
      showError("Failed to select workspace");
    }
  }, [isSuccess]);

  return (
    <StyledListItem
      onClick={async () => {
        try {
          await setDefaultWorkspace({ body: { id, name } });
          setSelectedOption(option);
        } catch (error) {
          console.log(error);
        } finally {
          handleClose();
        }
      }}
      disableGutters
      disablePadding
    >
      <StyledListItemButton disableRipple disableGutters>
        <div
          style={{
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          }}
        >
          <MuiAvatar
            sx={{
              width: 24,
              height: 24,
              fontSize: theme.typography.body1,
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            {name && name[0]}
          </MuiAvatar>
        </div>
        <StyledListItemText primary={name} />
        {isLoading ? (
          <AppLoader size="1rem" />
        ) : (
          id === selectedOption?.id && (
            <CheckCircleOutlineIcon fontSize="small" color="success" />
          )
        )}
      </StyledListItemButton>
    </StyledListItem>
  );
}

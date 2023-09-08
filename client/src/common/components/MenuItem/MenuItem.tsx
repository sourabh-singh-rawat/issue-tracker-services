import React from "react";
import MuiMenuItem from "@mui/material/MenuItem";
import MenuItemContent from "../MenuItemContent";
import MuiDoneIcon from "@mui/icons-material/Done";

interface MenuItemProps {
  item: { label: string; value?: string };
  selectedOption?: { label: string; value?: string } | undefined | null;
  onClick: () => void;
  avatarIcon?: JSX.Element;
  indicatorIcon?: JSX.Element;
}

export default function MenuItem({
  avatarIcon,
  item,
  selectedOption,
  onClick,
}: MenuItemProps) {
  const isSelected = item.value === selectedOption?.value;

  return (
    <MuiMenuItem
      onClick={onClick}
      sx={{ paddingRight: 1, paddingLeft: 1 }}
      selected={isSelected}
      disableRipple
    >
      <MenuItemContent
        avatarIcon={avatarIcon}
        label={item.label}
        indicatorIcon={
          selectedOption && isSelected ? <MuiDoneIcon /> : undefined
        }
      />
    </MuiMenuItem>
  );
}

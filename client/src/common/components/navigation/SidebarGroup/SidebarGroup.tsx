import React, { useState } from "react";
import MuiList from "@mui/material/List";
import MuiCollapse from "@mui/material/Collapse";
import MuiKeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";

import SidebarGroupItem from "../SidebarGroupItem";

interface SidebarGroupProps {
  label?: string;
  isVisible?: boolean;
  icon?: JSX.Element;
}

export default function SidebarGroup({
  icon,
  label,
  isVisible,
}: SidebarGroupProps) {
  const [isSidebarGroupOpen, setIsSidebarGroupOpen] = useState(false);

  const handleClickMenuItem = () => setIsSidebarGroupOpen(!isSidebarGroupOpen);

  return (
    <>
      <SidebarGroupItem
        icon={icon}
        label={label}
        onClick={handleClickMenuItem}
        indicatorIcon={<MuiKeyboardArrowRightTwoToneIcon />}
        isVisible={isVisible}
      />
      <MuiCollapse in={isSidebarGroupOpen} timeout="auto" unmountOnExit>
        <MuiList component="div" disablePadding>
          <SidebarGroupItem label={label} isVisible={isVisible} isChild />
        </MuiList>
      </MuiCollapse>
    </>
  );
}

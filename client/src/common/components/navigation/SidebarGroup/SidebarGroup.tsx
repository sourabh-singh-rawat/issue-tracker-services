import React, { useState } from "react";
import MuiList from "@mui/material/List";
import MuiCollapse from "@mui/material/Collapse";
import SidebarItem from "../SidebarItem";

import MuiKeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";

interface SidebarGroupProps {
  heading: string;
  isSidebarOpen: boolean;
  avatarIcon?: JSX.Element;
}

export default function SidebarGroup({
  heading,
  isSidebarOpen,
  avatarIcon,
}: SidebarGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <SidebarItem
        isSidebarOpen={isSidebarOpen}
        href=""
        icon={avatarIcon}
        text={heading}
        onClick={handleClick}
        indicatorIcon={<MuiKeyboardArrowRightTwoToneIcon />}
      />
      <MuiCollapse
        in={isOpen}
        timeout="auto"
        orientation="vertical"
        unmountOnExit
      >
        <MuiList component="div" disablePadding>
          <SidebarItem
            isSidebarOpen={isSidebarOpen}
            href=""
            text={heading}
            isChild
          />
        </MuiList>
      </MuiCollapse>
    </>
  );
}

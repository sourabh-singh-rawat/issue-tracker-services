import React from "react";
import { Link } from "react-router-dom";

import SidebarGroupItemContent from "../SidebarGroupItemContent";

interface SidebarGroupItemProps {
  avatarIcon?: JSX.Element;
  label?: string;
  indicatorIcon?: JSX.Element;
  onClick?: () => void;
  to?: string;
  isChild?: boolean;
  isVisible?: boolean;
}

export default function SidebarGroupItem({
  avatarIcon,
  label,
  indicatorIcon,
  onClick,
  isChild,
  to,
  isVisible,
}: SidebarGroupItemProps) {
  return to ? (
    <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
      <SidebarGroupItemContent
        avatarIcon={avatarIcon}
        label={label}
        indicatorIcon={indicatorIcon}
        onClick={onClick}
        isChild={isChild}
        isVisible={isVisible}
      />
    </Link>
  ) : (
    <div>
      <SidebarGroupItemContent
        avatarIcon={avatarIcon}
        label={label}
        indicatorIcon={indicatorIcon}
        onClick={onClick}
        isChild={isChild}
        isVisible={isVisible}
      />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

import SidebarGroupItemContent from "../SidebarGroupItemContent";

interface Props {
  icon?: JSX.Element;
  label?: string;
  indicatorIcon?: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  to?: string;
  isChild?: boolean;
  isVisible?: boolean;
}

export default function SidebarGroupItem({
  icon,
  label,
  indicatorIcon,
  onClick,
  isChild,
  to,
  isVisible,
}: Props) {
  return to ? (
    <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
      <SidebarGroupItemContent
        icon={icon}
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
        icon={icon}
        label={label}
        indicatorIcon={indicatorIcon}
        onClick={onClick}
        isChild={isChild}
        isVisible={isVisible}
      />
    </div>
  );
}

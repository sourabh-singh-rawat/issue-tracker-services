import React from "react";
import MenuItemContent from "../MenuItemContent";
import { Link } from "react-router-dom";

export interface MenuItemProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  avatarIcon?: JSX.Element;
  indicatorIcon?: JSX.Element | null;
  to?: string;
  isChild?: boolean;
  isMenuGroupOpen?: boolean;
}

export default function MenuItem({
  avatarIcon,
  label,
  onClick,
  indicatorIcon,
  to,
}: MenuItemProps) {
  return to ? (
    <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
      <MenuItemContent
        avatarIcon={avatarIcon}
        label={label}
        onClick={onClick}
        indicatorIcon={indicatorIcon}
      />
    </Link>
  ) : (
    <MenuItemContent
      avatarIcon={avatarIcon}
      label={label}
      onClick={onClick}
      indicatorIcon={indicatorIcon}
    />
  );
}

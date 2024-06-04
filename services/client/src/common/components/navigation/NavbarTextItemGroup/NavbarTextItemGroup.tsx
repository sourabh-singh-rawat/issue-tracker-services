import React from "react";
import MuiGrid from "@mui/material/Grid";
import NavbarTextItem from "../NavbarTextItem";
import { NavbarTextItemProps } from "../NavbarTextItem/NavbarTextItem";

interface NavbarGroup {
  items: NavbarTextItemProps[];
  itemSpacing?: number;
}

export default function NavbarTextItemGroup({
  items,
  itemSpacing = 3,
}: NavbarGroup) {
  return (
    <MuiGrid container columnSpacing={itemSpacing}>
      {items.map(({ to, label }) => (
        <MuiGrid item key={label}>
          <NavbarTextItem to={to} label={label} />
        </MuiGrid>
      ))}
    </MuiGrid>
  );
}

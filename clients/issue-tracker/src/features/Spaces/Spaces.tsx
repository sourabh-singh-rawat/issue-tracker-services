import React from "react";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";

import { SpacesModal } from "./SpacesModal";

interface SpacesProps {}

export function Spaces(props: SpacesProps) {
  return (
    <MuiList>
      <MuiListItem>
        <MuiListItemText>Spaces</MuiListItemText>
        <MuiListItemIcon>
          <SpacesModal />
        </MuiListItemIcon>
      </MuiListItem>
    </MuiList>
  );
}

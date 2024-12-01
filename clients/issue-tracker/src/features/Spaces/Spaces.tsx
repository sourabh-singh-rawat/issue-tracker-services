import React from "react";

import { SpacesModal } from "./SpacesModal";
import { useFindSpacesQuery } from "../../api/codegen/gql/graphql";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

interface SpacesProps {
  workspaceId: string;
}

export function Spaces({ workspaceId }: SpacesProps) {
  const { data: spaces } = useFindSpacesQuery({
    variables: { input: { workspaceId } },
  });

  return (
    <List>
      <ListItem>
        <ListItemText>Spaces</ListItemText>
        <ListItemIcon>
          <SpacesModal />
        </ListItemIcon>
      </ListItem>
      {spaces?.findSpaces.map(({ name }) => {
        return (
          <ListItem>
            <ListItemText>
              <Typography variant="body2">{name}</Typography>
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}

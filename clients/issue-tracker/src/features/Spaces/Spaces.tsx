import React, { useState } from "react";

import { CreateSpaceModal } from "./CreateSpaceModal";
import { useFindSpacesQuery } from "../../api/codegen/gql/graphql";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Space } from "./Space";

interface SpacesProps {
  workspaceId: string;
}

export function Spaces({ workspaceId }: SpacesProps) {
  const [open, setOpen] = useState(false);
  const { data: spaces } = useFindSpacesQuery({
    variables: { input: { workspaceId } },
  });

  return (
    <>
      <ListItem
        secondaryAction={<CreateSpaceModal open={open} setOpen={setOpen} />}
      >
        <ListItemText>Spaces</ListItemText>
      </ListItem>
      {spaces?.findSpaces.map(({ id, name, lists }) => (
        <Space
          spaceId={id}
          workspaceId={workspaceId}
          lists={lists}
          name={name}
        />
      ))}
    </>
  );
}

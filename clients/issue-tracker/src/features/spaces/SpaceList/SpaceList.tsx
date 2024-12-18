import { useState } from "react";

import { List, ListItem, ListItemText } from "@mui/material";
import { useAppSelector } from "../../../common";
import { CreateSpaceModal } from "../CreateSpaceModal";
import { SpaceListItem } from "../SpaceListItem/SpaceListItem";

interface SpaceMenuProps {
  workspaceId: string;
}

export const SpaceList = ({ workspaceId }: SpaceMenuProps) => {
  const [open, setOpen] = useState(false);
  const spaces = useAppSelector((x) => x.space.spaces);

  return (
    <List
      subheader={
        <>
          <ListItem
            secondaryAction={<CreateSpaceModal open={open} setOpen={setOpen} />}
          >
            <ListItemText>Spaces</ListItemText>
          </ListItem>
          {spaces &&
            workspaceId &&
            spaces.map(({ id, name, lists }) => (
              <SpaceListItem
                key={id}
                spaceId={id}
                workspaceId={workspaceId}
                lists={lists}
                name={name}
              />
            ))}
        </>
      }
      disablePadding
    />
  );
};

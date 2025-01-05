import { useState } from "react";

import { List, ListItem, ListItemText, Skeleton } from "@mui/material";
import { useAppSelector } from "../../../common";
import { CreateSpaceModal } from "../CreateSpaceModal";
import { SpaceListItem } from "../SpaceListItem/SpaceListItem";

interface SpaceMenuProps {
  workspaceId: string;
}

export const SpaceList = ({ workspaceId }: SpaceMenuProps) => {
  const [open, setOpen] = useState(false);
  const space = useAppSelector((x) => x.space);
  const spaces = space.spaces;

  return (
    <List
      subheader={
        <>
          <ListItem
            secondaryAction={<CreateSpaceModal open={open} setOpen={setOpen} />}
            dense
          >
            <ListItemText>Spaces</ListItemText>
          </ListItem>
          {space.isLoading ? (
            <ListItem dense>
              <ListItemText>
                <Skeleton />
              </ListItemText>
            </ListItem>
          ) : (
            spaces.map(({ id, name, lists }) => (
              <SpaceListItem
                key={id}
                spaceId={id}
                workspaceId={workspaceId}
                lists={lists}
                name={name}
              />
            ))
          )}
        </>
      }
      disablePadding
    />
  );
};

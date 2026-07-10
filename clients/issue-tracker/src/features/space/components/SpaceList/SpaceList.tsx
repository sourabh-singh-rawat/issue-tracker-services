import { useState } from "react";

import { List, ListItem, ListItemText, Skeleton } from "@mui/material";
import { useSpaceStore } from "../../store";
import { CreateSpaceModal } from "../CreateSpaceModal";
import { SpaceListItem } from "../SpaceListItem/SpaceListItem";

interface SpaceMenuProps {
  workspaceId: string;
}

export const SpaceList = ({ workspaceId }: SpaceMenuProps) => {
  const [open, setOpen] = useState(false);
  const spaces = useSpaceStore((s) => s.spaces);
  const isLoading = useSpaceStore((s) => s.isLoading);

  return (
    <List
      subheader={
        <>
          <ListItem
            secondaryAction={<CreateSpaceModal open={open} setOpen={setOpen} />}
          >
            <ListItemText>Spaces</ListItemText>
          </ListItem>
          {isLoading ? (
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

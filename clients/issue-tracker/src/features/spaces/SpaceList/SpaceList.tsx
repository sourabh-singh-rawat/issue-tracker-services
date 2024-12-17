import { useState } from "react";

import { List, ListItem, ListItemText } from "@mui/material";
import { useFindSpacesQuery } from "../../../api/codegen/gql/graphql";
import { useAppSelector } from "../../../common";
import { CreateSpaceModal } from "../CreateSpaceModal";
import { SpaceListItem } from "../SpaceListItem/SpaceListItem";

interface SpaceMenuProps {}

export const SpaceList = ({}: SpaceMenuProps) => {
  const [open, setOpen] = useState(false);
  const currentWorkspace = useAppSelector((x) => x.workspace.current);
  const { data: spaces } = useFindSpacesQuery({
    variables: { input: { workspaceId: "1" } },
  });

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
            currentWorkspace &&
            spaces.findSpaces.map(({ id, name, lists }) => (
              <SpaceListItem
                key={id}
                spaceId={id}
                workspaceId={currentWorkspace.id}
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

import { useState } from "react";

import { ListItem, ListItemText } from "@mui/material";
import { useFindSpacesQuery } from "../../../api/codegen/gql/graphql";
import { CreateSpaceModal } from "../CreateSpaceModal";
import { Space } from "../Space/Space";

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
      {spaces &&
        spaces.findSpaces.map(({ id, name, lists }) => (
          <Space
            key={id}
            spaceId={id}
            workspaceId={workspaceId}
            lists={lists}
            name={name}
          />
        ))}
    </>
  );
}

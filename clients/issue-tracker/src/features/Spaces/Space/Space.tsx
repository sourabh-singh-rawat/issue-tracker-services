import React, { useState } from "react";
import {
  Add,
  ExpandLess,
  ExpandMore,
  List as ListIcon,
} from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { CreateListModal } from "../../Lists/pages/CreateListModal/CreateListModal";
import { List as ListOutput } from "../../../api/codegen/gql/graphql";
import { useNavigate } from "react-router-dom";

interface SpaceProps {
  spaceId: string;
  workspaceId: string;
  lists: ListOutput[];
  name: string;
}

export function Space({ name, spaceId, workspaceId, lists }: SpaceProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItemButton onClick={handleClick} disableRipple>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText primary={name} />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {lists.map(({ id, name }) => {
          return (
            <ListItemButton
              sx={{ pl: 4 }}
              component="div"
              onClick={() => navigate(`${spaceId}/l/${id}/items`)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          );
        })}
      </Collapse>
      <CreateListModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        spaceId={spaceId}
        workspaceId={workspaceId}
      />
    </>
  );
}

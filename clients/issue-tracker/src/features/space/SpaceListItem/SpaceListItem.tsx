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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List as ListOutput } from "../../../api/codegen/gql/graphql";
import { CreateListModal } from "../../list";

interface SpaceProps {
  spaceId: string;
  workspaceId: string;
  lists: ListOutput[];
  name: string;
}

export const SpaceListItem = ({
  name,
  spaceId,
  workspaceId,
  lists,
}: SpaceProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItemButton onClick={handleClick} disableRipple dense>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText primary={name} />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          size="small"
          sx={{
            borderRadius: theme.shape.borderRadiusLarge,
            ":hover": {
              bgcolor: theme.palette.action.hover,
            },
          }}
          disableRipple
        >
          <Add fontSize="small" />
        </IconButton>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {lists.map(({ id, name, selectedViewId, space }) => {
          return (
            <ListItemButton
              key={id}
              sx={{ pl: 4 }}
              component="div"
              onClick={() => {
                localStorage.setItem(
                  "currentList",
                  JSON.stringify({ id, name, selectedViewId, space }),
                );
                navigate(`${workspaceId}/v/l/${selectedViewId}`);
              }}
              dense
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
};

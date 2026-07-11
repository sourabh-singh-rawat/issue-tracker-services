import { FolderOutlined } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useProjectStore } from "../../store";

interface ProjectListItemProps {
  projectId: string;
  workspaceId: string;
  name: string;
}

export const ProjectListItem = ({
  projectId,
  workspaceId,
  name,
}: ProjectListItemProps) => {
  const navigate = useNavigate();
  const setCurrentProject = useProjectStore((s) => s.setCurrentProject);

  return (
    <ListItemButton
      dense
      onClick={() => {
        setCurrentProject({
          id: projectId,
          name,
        } as any);
        localStorage.setItem(
          "currentProject",
          JSON.stringify({ id: projectId, name }),
        );
        navigate({
          to: "/$workspaceId/v/l/$viewId",
          params: { workspaceId, viewId: projectId },
        });
      }}
    >
      <ListItemIcon>
        <FolderOutlined fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  );
};

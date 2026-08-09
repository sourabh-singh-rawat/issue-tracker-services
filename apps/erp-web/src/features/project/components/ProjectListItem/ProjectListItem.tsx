import FolderOutlined from "@mui/icons-material/FolderOutlined";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useProjectStore } from "../../store";

interface ProjectListItemProps {
  projectId: string;
  name: string;
}

export const ProjectListItem = ({ projectId, name }: ProjectListItemProps) => {
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
        localStorage.setItem("currentProject", JSON.stringify({ id: projectId, name }));
        navigate({
          to: "/v/l/$viewId",
          params: { viewId: projectId },
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

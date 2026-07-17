import { List, ListItem, ListItemText, Skeleton } from "@mui/material";
import { useProjectStore } from "../../store";
import { CreateProjectModal } from "../CreateProjectModal";
import { ProjectListItem } from "../ProjectListItem";

interface ProjectListProps {
  workspaceId: string;
}

export const ProjectList = ({ workspaceId }: ProjectListProps) => {
  const projects = useProjectStore((s) => s.projects);
  const isLoading = useProjectStore((s) => s.isLoading);

  return (
    <List
      subheader={
        <>
          <ListItem
            secondaryAction={<CreateProjectModal workspaceId={workspaceId} />}
          >
            <ListItemText>Projects</ListItemText>
          </ListItem>
          {isLoading ? (
            <ListItem dense>
              <ListItemText>
                <Skeleton />
              </ListItemText>
            </ListItem>
          ) : (
            projects.map(({ id, name }) => (
              <ProjectListItem
                key={id}
                projectId={id}
                workspaceId={workspaceId}
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

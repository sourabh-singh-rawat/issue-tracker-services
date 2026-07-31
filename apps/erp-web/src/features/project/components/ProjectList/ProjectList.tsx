import { List, ListItem, ListItemText, Skeleton } from "@mui/material";
import { useProjectStore } from "../../store";
import { CreateProjectModal } from "../CreateProjectModal";
import { ProjectListItem } from "../ProjectListItem";

export const ProjectList = () => {
  const projects = useProjectStore((s) => s.projects);
  const isLoading = useProjectStore((s) => s.isLoading);

  return (
    <List
      subheader={
        <>
          <ListItem secondaryAction={<CreateProjectModal />}>
            <ListItemText>Projects</ListItemText>
          </ListItem>
          {isLoading ? (
            <ListItem dense>
              <ListItemText>
                <Skeleton />
              </ListItemText>
            </ListItem>
          ) : (
            projects
              .filter(
                (project): project is typeof project & { id: string; name: string } =>
                  Boolean(project.id) && Boolean(project.name),
              )
              .map(({ id, name }) => <ProjectListItem key={id} projectId={id} name={name} />)
          )}
        </>
      }
      disablePadding
    />
  );
};

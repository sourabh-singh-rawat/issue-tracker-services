import { Grid2, useTheme } from "@mui/material";
import { useFindStatusesQuery, useFindProjectQuery } from "@generated/gql";
import { useViewParams } from "@shared";
import { StatusesContext } from "@shared/contexts/StatusesContext";
import { IssueList } from "@features/issue/components";
import { ViewLocation, ViewSwitcher } from "../../components";

export const ListView = () => {
  const theme = useTheme();
  const { viewId: projectId } = useViewParams();
  const { data: project } = useFindProjectQuery(
    { findProjectId: projectId! },
    {
      select: (data) => data.findProject,
      enabled: Boolean(projectId),
    },
  );
  const { data: statuses = [] } = useFindStatusesQuery(
    { input: { projectId: projectId! } },
    {
      select: (data) =>
        (data.findStatuses ?? []).filter(
          (status): status is { id: string; name: string } =>
            Boolean(status.id) && Boolean(status.name),
        ),
      enabled: Boolean(projectId),
    },
  );

  const projectView =
    project?.id && project.name && project.workspace?.id && project.workspace.name
      ? {
          id: project.id,
          name: project.name,
          workspace: { id: project.workspace.id, name: project.workspace.name },
        }
      : null;

  return (
    <Grid2 container>
      <StatusesContext.Provider value={{ statuses }}>
        {projectView && (
          <>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                py: theme.spacing(0.75),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewLocation project={projectView} />
            </Grid2>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewSwitcher projectId={projectView.id} />
            </Grid2>
            <Grid2 size={12} sx={{ p: theme.spacing(2) }}>
              <IssueList projectId={projectView.id} />
            </Grid2>
          </>
        )}
      </StatusesContext.Provider>
    </Grid2>
  );
};

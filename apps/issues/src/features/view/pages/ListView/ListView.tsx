import { Grid2, useTheme } from "@mui/material";
import { useFindStatusesQuery, useFindProjectQuery } from "@generated/gql";
import { useViewParams } from "@common";
import { StatusesContext } from "@common/contexts/StatusesContext";
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
      select: (data) => data.findStatuses,
      enabled: Boolean(projectId),
    },
  );

  return (
    <Grid2 container>
      <StatusesContext.Provider value={{ statuses }}>
        {project && (
          <>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                py: theme.spacing(0.75),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewLocation project={project} />
            </Grid2>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewSwitcher projectId={project.id} />
            </Grid2>
            <Grid2 size={12} sx={{ p: theme.spacing(2) }}>
              <IssueList projectId={project.id} />
            </Grid2>
          </>
        )}
      </StatusesContext.Provider>
    </Grid2>
  );
};

import { Grid2, useTheme } from "@mui/material";
import {
  useFindStatusesQuery,
  useFindViewQuery,
} from "@generated/gql";
import { SpaceContext, useViewParams } from "@common";
import { ItemList } from "@features/item/components";
import { ViewLocation, ViewSwitcher } from "../../components";

export const ListView = () => {
  const theme = useTheme();
  const { viewId } = useViewParams();
  const { data: view } = useFindViewQuery(
    { viewId: viewId! },
    {
      select: (data) => data.findView,
      enabled: Boolean(viewId),
    },
  );
  const { data: statuses = [] } = useFindStatusesQuery(
    { input: { listId: view?.list.id! } },
    {
      select: (data) => data.findStatuses,
      enabled: Boolean(view?.list.id),
    },
  );

  return (
    <Grid2 container>
      <SpaceContext.Provider value={{ statuses }}>
        {view && (
          <>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                py: theme.spacing(0.75),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewLocation list={view.list} />
            </Grid2>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewSwitcher listId={view.list.id} />
            </Grid2>
            <Grid2 size={12} sx={{ p: theme.spacing(2) }}>
              <ItemList listId={view.list.id} />
            </Grid2>
          </>
        )}
      </SpaceContext.Provider>
    </Grid2>
  );
};

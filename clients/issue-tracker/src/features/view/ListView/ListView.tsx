import { Card, Grid2, useTheme } from "@mui/material";
import { useState } from "react";
import {
  Status,
  View,
  useFindListItemsQuery,
  useFindStatusesQuery,
  useFindViewQuery,
} from "../../../api";
import { SpaceContext, useViewParams } from "../../../common";
import { Link } from "../../../common/components/base";
import { ViewLocation } from "../ViewLocation";
import { ViewSwitcher } from "../ViewSwitcher";

export const ListView = () => {
  const theme = useTheme();
  const { viewId } = useViewParams();
  const [view, setView] = useState<View | null>();
  const [statuses, setStatuses] = useState<Status[]>([]);

  useFindViewQuery({
    variables: { viewId },
    onCompleted(response) {
      setView(response.findView);
    },
  });

  useFindStatusesQuery({
    variables: { input: { listId: view?.list.id as string } },
    skip: !view?.list.id,
    onCompleted(response) {
      setStatuses(response.findStatuses);
    },
  });

  const { data } = useFindListItemsQuery({
    variables: { listId: view?.list.id as string },
    skip: !view?.list.id,
    onCompleted(response) {
      console.log(response.findListItems);
    },
  });

  return (
    <Grid2 container>
      <SpaceContext.Provider value={{ statuses }}>
        {view && (
          <>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                py: theme.spacing(1),
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
              {data?.findListItems.map(({ id, name, priority }, index) => {
                return (
                  <Card
                    key={id}
                    variant="outlined"
                    sx={{
                      p: theme.spacing(1),
                      border: "none",
                      borderBottom: `1px solid ${theme.palette.action.focus}`,
                      borderRadius: theme.shape.borderRadiusNone,
                    }}
                  >
                    <Link to={`/i/${id}`}>{name}</Link> {priority}
                  </Card>
                );
              })}
            </Grid2>
          </>
        )}
      </SpaceContext.Provider>
    </Grid2>
  );
};

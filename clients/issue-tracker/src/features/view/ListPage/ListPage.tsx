import { Grid2, useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  List,
  Status,
  useFindStatusesQuery,
  useFindViewQuery,
  useFindViewsQuery,
} from "../../../api";
import { SpaceContext, useViewParams } from "../../../common";
import { ViewLocation } from "../ViewLocation";
import { ViewSwitcher } from "../ViewSwitcher";

export const ListPage = () => {
  const theme = useTheme();
  const { viewId } = useViewParams();
  const [listId, setListId] = useState("");
  const [list, setList] = useState<List | null>(null);

  const { data: view } = useFindViewQuery({
    variables: { viewId },
    onCompleted(response) {
      const list = response.findView.list;
      setListId(list.id);
      setList(list);
    },
  });

  const { data: views } = useFindViewsQuery({
    variables: { listId },
    skip: !listId,
  });

  const [statuses, setStatuses] = useState<Status[]>([]);

  useFindStatusesQuery({
    variables: { input: { listId: listId as string } },
    skip: !listId,
    onCompleted(response) {
      setStatuses(response.findStatuses);
    },
  });

  return (
    <SpaceContext.Provider value={{ statuses }}>
      <Grid2 container rowSpacing={1}>
        {view?.findView && (
          <>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                py: theme.spacing(1),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewLocation
                spaceName={list?.space.name}
                listName={list?.name}
              />
            </Grid2>
            {views?.findViews && (
              <Grid2
                size={12}
                sx={{
                  borderBottom: `1px solid ${theme.palette.action.hover}`,
                  px: theme.spacing(2),
                }}
              >
                <ViewSwitcher listId={listId} views={views.findViews} />
              </Grid2>
            )}
            <Grid2
              size={12}
              sx={{ px: theme.spacing(3), py: theme.spacing(1) }}
            >
              <Outlet context={{ listId, statuses }} />
            </Grid2>
          </>
        )}
      </Grid2>
    </SpaceContext.Provider>
  );
};

import { Grid2, useTheme } from "@mui/material";
import { useState } from "react";
import { View, useFindViewQuery } from "../../../api";
import { useViewParams } from "../../../common";
import { ViewLocation } from "../ViewLocation";
import { ViewSwitcher } from "../ViewSwitcher";

export const ListView = () => {
  const theme = useTheme();
  const { viewId } = useViewParams();
  const [view, setView] = useState<View | null>();

  useFindViewQuery({
    variables: { viewId },
    onCompleted(response) {
      setView(response.findView);
    },
  });
  // const { data } = useFindListItemsQuery({
  //   variables: { listId },
  //   skip: !listId,
  //   onCompleted(response) {
  //     console.log(response.findListItems);
  //   },
  // });

  return (
    <Grid2 container>
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
        </>
      )}
      {/* {data?.findListItems.map(({ name }, index) => {
        return (
          <Grid2 key={index} size={12}>
            {name}
          </Grid2>
        );
      })} */}
    </Grid2>
  );
};

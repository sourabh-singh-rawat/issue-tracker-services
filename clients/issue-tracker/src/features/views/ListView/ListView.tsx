import { Grid2, useTheme } from "@mui/material";
import { useState } from "react";
import { View, useFindViewQuery } from "../../../api";
import { useViewParams } from "../../../common";
import { SelectableViews } from "../SelectableViews";
import { ViewLocation } from "../ViewLocation";

export const ListView = () => {
  const { viewId } = useViewParams();
  const [view, setView] = useState<View | null>();
  const theme = useTheme();

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
    <Grid2 container rowSpacing={2}>
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
          <Grid2 size={12}>
            <SelectableViews listId={view.list.id} />
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

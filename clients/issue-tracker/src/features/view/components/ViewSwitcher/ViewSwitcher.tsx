import { Grid2 } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useFindViewsQuery } from "@generated/gql";
import { useViewParams } from "@common";
import { CustomTab } from "../../../../common/components/CustomTab";
import { CustomTabs } from "../../../../common/components/CustomTabs";
import { AddItemButton } from "../../../item/components/AddItemButton";

interface ViewProps {
  listId: string;
}

export const ViewSwitcher = ({ listId }: ViewProps) => {
  const navigate = useNavigate();
  const { viewId, workspaceId } = useViewParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: views } = useFindViewsQuery(
    { listId },
    {
      select: (data) => data.findViews,
      enabled: Boolean(listId),
    },
  );

  const handleChange = (e: unknown, newValue: number) => {
    navigate({
      to: "/$workspaceId/v/l/$viewId",
      params: { workspaceId, viewId },
    });
    setSelectedTab(newValue);
  };

  return (
    <Grid2 container sx={{ alignItems: "center" }}>
      <Grid2>
        <CustomTabs handleChange={handleChange} value={selectedTab}>
          {views?.map((view) => {
            const { id, name, order } = view;

            return <CustomTab key={id} index={order} label={name} />;
          })}
        </CustomTabs>
      </Grid2>
      <Grid2 flexGrow={1}></Grid2>
      <Grid2>
        <AddItemButton listId={listId} />
      </Grid2>
    </Grid2>
  );
};

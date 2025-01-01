import { Grid2 } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFindViewsQuery, View } from "../../../api";
import { useViewParams } from "../../../common";
import { CustomTab } from "../../../common/components/CustomTab";
import { CustomTabs } from "../../../common/components/CustomTabs";
import { AddItemButton } from "../../issue/components/AddItemButton";

interface ViewProps {
  listId: string;
}

export const SelectableViews = ({ listId }: ViewProps) => {
  const navigate = useNavigate();
  const { viewId } = useViewParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedView, setSelectedView] = useState<View | null>(null);
  const { data } = useFindViewsQuery({ variables: { listId } });

  const handleChange = (e: unknown, newValue: number) => {
    console.log(selectedView);
    switch (selectedView?.type) {
      case "Board":
        navigate(`b/${viewId}`);
        break;
      case "List":
        navigate(`l/${viewId}`);
        break;
    }
    setSelectedTab(newValue);
  };

  return (
    <Grid2 container sx={{ alignItems: "center" }}>
      <Grid2>
        <CustomTabs handleChange={handleChange} value={selectedTab}>
          {data?.findViews.map((view, index) => {
            const { id, name } = view;

            return (
              <CustomTab
                key={id}
                index={index}
                label={name}
                onClick={() => setSelectedView(view)}
              />
            );
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

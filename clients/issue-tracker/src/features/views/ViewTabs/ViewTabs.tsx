import { Grid2 } from "@mui/material";
import { useState } from "react";
import { View } from "../../../api";
import { CustomTab } from "../../../common/components/CustomTab";
import { CustomTabs } from "../../../common/components/CustomTabs";
import { AddItemButton } from "../../issue/components/AddItemButton";

interface ViewProps {
  listId: string;
  views: View[];
}

export const ViewTabs = ({ listId, views }: ViewProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (e: unknown, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid2 container sx={{ alignItems: "center" }}>
      <Grid2>
        <CustomTabs handleChange={handleChange} value={selectedTab}>
          {views.map(({ id, name }, index) => (
            <CustomTab key={id} index={index} label={name} />
          ))}
        </CustomTabs>
      </Grid2>
      <Grid2 flexGrow={1}></Grid2>
      <Grid2>
        <AddItemButton listId={listId} />
      </Grid2>
    </Grid2>
  );
};

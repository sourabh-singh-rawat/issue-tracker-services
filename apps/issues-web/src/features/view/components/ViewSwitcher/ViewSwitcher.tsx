import { Grid2 } from "@mui/material";
import { useState } from "react";
import { useViewParams } from "@shared";
import { CustomTab } from "../../../../shared/components/CustomTab";
import { CustomTabs } from "../../../../shared/components/CustomTabs";
import { AddIssueButton } from "../../../issue/components/AddIssueButton";

interface ViewProps {
  projectId: string;
}

export const ViewSwitcher = ({ projectId }: ViewProps) => {
  const { viewId, workspaceId } = useViewParams();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (e: unknown, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid2 container sx={{ alignItems: "center" }}>
      <Grid2>
        <CustomTabs handleChange={handleChange} value={selectedTab}>
          <CustomTab index={0} label="List" />
          <CustomTab index={1} label="Board" />
        </CustomTabs>
      </Grid2>
      <Grid2 flexGrow={1}></Grid2>
      <Grid2>
        <AddIssueButton projectId={projectId} />
      </Grid2>
    </Grid2>
  );
};

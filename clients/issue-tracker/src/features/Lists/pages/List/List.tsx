import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { Grid2, useTheme } from "@mui/material";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";

import { useMessageBar } from "../../../message-bar/hooks";

export function List() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess } = useMessageBar();
  const [isLoading] = useState(false);

  const tabName = location.pathname.split("/")[3] || "overview";
  const mapPathToIndex: Record<string, number> = { overview: 0, items: 1 };
  const mapIndexToTab: Record<number, string> = {
    0: `/lists/${id}/overview`,
    1: `/lists/${id}/items`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tabName]);

  const handleChange = (e: unknown, newValue: number) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => setSelectedTab(mapPathToIndex[tabName]), [tabName, id]);

  return (
    <Grid2 container>
      <Grid2 size={12} sx={{ pt: theme.spacing(1) }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={isLoading} label="Board" value={0} />
          <Tab isLoading={isLoading} label="List" value={1} />
        </Tabs>
      </Grid2>

      <Grid2 size={12}>
        <Outlet context={{ id, selectedTab, page: {}, isLoading }} />
      </Grid2>
    </Grid2>
  );
}

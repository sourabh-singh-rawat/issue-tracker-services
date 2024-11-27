import React from "react";
import dayjs from "dayjs";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import Avatar from "../../../../common/components/Avatar";
import Tooltip from "../../../../common/components/Tooltip";
import TabPanel from "../../../../common/components/TabPanel";
import { useSelectedTab } from "../../../../common/hooks";

export default function ProjectActivity() {
  const theme = useTheme();
  const { selectedTab, id } = useSelectedTab();
  // const { data: activityList } = useGetProjectActivityListQuery({ id });

  return (
    <TabPanel index={3} selectedTab={selectedTab} sx={{ py: theme.spacing(1) }}>
      {activityList?.rows.map((activity, index) => (
        <MuiGrid
          key={index}
          columnSpacing={1}
          sx={{
            py: theme.spacing(1),
            alignItems: "center",
            textAlign: "center",
          }}
          container
        >
          <MuiGrid item>
            <Avatar label={activity?.displayName} />
          </MuiGrid>
          <MuiGrid item>
            <MuiTypography
              sx={{
                color: theme.palette.text.primary,
                fontWeight: theme.typography.fontWeightMedium,
              }}
              variant="body2"
            >
              {activity?.displayName}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item>
            <MuiTypography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {activity?.action}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item>
            <MuiTypography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              <Tooltip
                title={dayjs(activity?.timestamp).format(
                  "dddd, MMMM D, YYYY h:mm A",
                )}
              >
                {dayjs(activity?.timestamp).fromNow()}
              </Tooltip>
            </MuiTypography>
          </MuiGrid>
        </MuiGrid>
      ))}
    </TabPanel>
  );
}

import { SpaceDashboardOutlined } from "@mui/icons-material";
import { Box, Grid2, IconButton } from "@mui/material";
import type { FindViewQuery } from "@generated/gql";
import { CustomBreadcrumbs } from "../CustomBreadcrumbs";

interface LocationProps {
  list: FindViewQuery["findView"]["list"];
}

export const ViewLocation = ({ list }: LocationProps) => {
  return (
    <Box>
      <Grid2 container>
        <Grid2>
          <IconButton>
            <SpaceDashboardOutlined fontSize="small" />
          </IconButton>
        </Grid2>
        <Grid2 sx={{ alignContent: "center" }}>
          <CustomBreadcrumbs
            isLoading={false}
            items={[
              { text: list.space.name, onClick() {} },
              { text: list.name, onClick() {} },
            ]}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

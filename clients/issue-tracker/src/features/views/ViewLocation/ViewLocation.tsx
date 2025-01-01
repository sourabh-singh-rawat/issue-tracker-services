import { SpaceDashboardOutlined } from "@mui/icons-material";
import { Box, Grid2, IconButton } from "@mui/material";
import { List } from "../../../api";
import { CustomBreadcrumbs } from "../components/CustomBreadcrumbs";

interface LocationProps {
  list: List;
}

export const ViewLocation = ({ list }: LocationProps) => {
  return (
    <Box>
      <Grid2 container>
        <Grid2>
          <IconButton>
            <SpaceDashboardOutlined />
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

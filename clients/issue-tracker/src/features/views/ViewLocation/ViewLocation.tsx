import { SpaceDashboardOutlined } from "@mui/icons-material";
import { Box, Grid2, IconButton, useTheme } from "@mui/material";
import { CustomBreadcrumbs } from "../components/CustomBreadcrumbs";

interface ViewLocationProps {}

export const ViewLocation = (props: ViewLocationProps) => {
  const theme = useTheme();

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
              { text: "My Space", onClick() {} },
              { text: "Me", onClick() {} },
            ]}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

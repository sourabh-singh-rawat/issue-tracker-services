import { SpaceDashboardOutlined } from "@mui/icons-material";
import { Box, Grid2, IconButton } from "@mui/material";
import { CustomBreadcrumbs } from "../components/CustomBreadcrumbs";

interface LocationProps {
  spaceName: string;
  listName: string;
}

export const ListLocation = ({ spaceName, listName }: LocationProps) => {
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
              { text: spaceName, onClick() {} },
              { text: listName, onClick() {} },
            ]}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

import { Typography } from "@mui/material";
import PageHeader from "@shared/components/PageHeader/PageHeader";

export function InventoryHomePage() {
  return (
    <>
      <PageHeader title="Inventory" showButton={false} />
      <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
        Inventory module — stock and inventory management will live here.
      </Typography>
    </>
  );
}

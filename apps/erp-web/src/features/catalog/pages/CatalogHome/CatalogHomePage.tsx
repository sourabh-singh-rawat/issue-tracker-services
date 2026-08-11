import { Typography } from "@mui/material";
import PageHeader from "@shared/components/PageHeader/PageHeader";

export const CatalogHomePage = () => {
  return (
    <>
      <PageHeader title="Catalog" showButton={false} />
      <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
        Product catalog — products, brands, and catalog management will live here.
      </Typography>
    </>
  );
};

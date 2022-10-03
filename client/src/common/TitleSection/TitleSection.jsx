import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { format, formatISO, parseISO, parse } from "date-fns";
import { enIN } from "date-fns/esm/locale";

import { Skeleton } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import Title from "../Title/Title";

export default function TitleSection({
  page,
  updateTitle,
  updateTitleQuery,
  loading,
  breadcrumbItems,
}) {
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  return (
    <MuiGrid container gap="2px">
      <MuiGrid item xs={12}>
        {loading ? (
          <Skeleton variant="text" width="50%" />
        ) : (
          <Title
            page={page}
            updateTitle={updateTitle}
            updateTitleQuery={updateTitleQuery}
            breadcrumbItems={breadcrumbItems}
          />
        )}
      </MuiGrid>
      <MuiGrid item xs={12} sx={{ color: "text.subtitle1" }}>
        <MuiBreadcrumbs separator="•">
          <MuiTypography variant="body2" component="span" fontWeight={600}>
            {type[0].toUpperCase()}
            {type.slice(1, -1)}
          </MuiTypography>
          <MuiTypography variant="body2" component="span" fontWeight={600}>
            Published on{" "}
            {page.creation_date &&
              format(parseISO(page.creation_date), "PPPpp", {
                locale: enIN,
              })}
          </MuiTypography>
        </MuiBreadcrumbs>
      </MuiGrid>
    </MuiGrid>
  );
}

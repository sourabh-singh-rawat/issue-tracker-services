import { useLocation, useNavigate } from "react-router-dom";
import { format, formatISO, parseISO, parse } from "date-fns";
import { enIN } from "date-fns/esm/locale";

import { IconButton, Skeleton } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";

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
    <MuiGrid container gap="0">
      <MuiGrid item xs={12}>
        <Title
          loading={loading}
          page={page}
          updateTitle={updateTitle}
          updateTitleQuery={updateTitleQuery}
          breadcrumbItems={breadcrumbItems}
        />
      </MuiGrid>
      <MuiGrid item xs={12} sx={{ color: "text.secondary" }}>
        <MuiBreadcrumbs separator="•">
          {loading ? (
            <Skeleton width="80px" />
          ) : (
            <MuiTypography variant="body2" component="span" fontWeight={600}>
              {type[0].toUpperCase()}
              {type.slice(1, -1)}
            </MuiTypography>
          )}
          {loading ? (
            <Skeleton width="80px" />
          ) : (
            <MuiTypography variant="body2" component="span" fontWeight={600}>
              Published on{" "}
              {page.creation_date &&
                format(parseISO(page.creation_date), "PPPP", {
                  locale: enIN,
                })}
            </MuiTypography>
          )}
        </MuiBreadcrumbs>
      </MuiGrid>
    </MuiGrid>
  );
}

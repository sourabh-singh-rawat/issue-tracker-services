import { useLocation } from "react-router-dom";
import { format, formatISO, parseISO } from "date-fns";
import { enIN } from "date-fns/esm/locale";

import Skeleton from "@mui/material/Skeleton";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import Title from "../Title/Title";
import ProjectStatusSelector from "../../features/project/components/ProjectStatusSelector/ProjectStatusSelector";

const TitleSection = ({
  page,
  loading,
  updateTitle,
  updateTitleQuery,
  breadcrumbItems,
  statusSelector,
  prioritySelector,
}) => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        <Title
          page={page}
          loading={loading}
          updateTitle={updateTitle}
          updateTitleQuery={updateTitleQuery}
          breadcrumbItems={breadcrumbItems}
        />
      </MuiGrid>
      <MuiGrid item xs={12} sx={{ color: "text.secondary" }}>
        <MuiBreadcrumbs separator="•">
          {loading ? <Skeleton width="80px" /> : statusSelector}
          {loading ? <Skeleton width="80px" /> : prioritySelector}
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
};

export default TitleSection;

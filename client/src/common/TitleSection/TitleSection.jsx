import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { format, formatISO, parseISO, parse } from "date-fns";
import { enIN } from "date-fns/esm/locale";

import { Skeleton } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import Chip from "../Chip";
import Title from "../Title/Title";

const TitleSection = ({
  breadcrumbItems,
  page,
  updateTitle,
  updateTitleQuery,
  loading,
}) => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const project = useSelector((store) => store.project.info);

  return (
    <MuiGrid container gap="2px">
      <MuiGrid item xs={12}>
        {loading ? (
          <Skeleton variant="text" width="50%" />
        ) : (
          <Title
            page={page}
            type={breadcrumbItems}
            updateTitle={updateTitle}
            updateTitleQuery={updateTitleQuery}
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
            {project.creation_date &&
              format(parseISO(project.creation_date), "PPPpp", {
                locale: enIN,
              })}
          </MuiTypography>
        </MuiBreadcrumbs>
      </MuiGrid>
    </MuiGrid>
  );
};

export default TitleSection;

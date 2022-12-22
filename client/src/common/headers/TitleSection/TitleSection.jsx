/* eslint-disable operator-linebreak */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useLocation } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { enIN } from 'date-fns/esm/locale';

import { useTheme } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import Title from '../../textfields/Title';
import Breadcrumbs from '../../navigations/Breadcrumbs';

function TitleSection({
  page,
  updateTitle,
  updateTitleQuery,
  breadcrumbItems,
  statusSelector,
  prioritySelector,
  isLoading,
}) {
  const theme = useTheme();
  const location = useLocation();
  const type = location.pathname.split('/')[1];

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        <Breadcrumbs items={breadcrumbItems} isLoading={isLoading} />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Title
          page={page}
          isLoading={isLoading}
          updateTitle={updateTitle}
          updateTitleQuery={updateTitleQuery}
        />
      </MuiGrid>
      <MuiGrid item xs={12} sx={{ color: theme.palette.grey[700] }}>
        <MuiBreadcrumbs separator="•">
          {isLoading ? <MuiSkeleton width="80px" /> : statusSelector}
          {isLoading ? <MuiSkeleton width="80px" /> : prioritySelector}
          {isLoading ? (
            <MuiSkeleton width="80px" />
          ) : (
            <MuiTypography variant="body2" component="span" fontWeight={600}>
              {type[0].toUpperCase()}
              {type.slice(1, -1)}
            </MuiTypography>
          )}
          {isLoading ? (
            <MuiSkeleton width="80px" />
          ) : (
            <MuiTypography variant="body2" component="span" fontWeight={600}>
              {page.createdAt &&
                format(parseISO(page.createdAt), 'dd MMMM yyyy', {
                  locale: enIN,
                })}
            </MuiTypography>
          )}
        </MuiBreadcrumbs>
      </MuiGrid>
    </MuiGrid>
  );
}

export default TitleSection;

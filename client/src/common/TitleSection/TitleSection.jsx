/* eslint-disable operator-linebreak */
/* eslint-disable react/prop-types */
import { enIN } from 'date-fns/esm/locale';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import MuiGrid from '@mui/material/Grid';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import Breadcrumbs from '../Breadcrumbs';
import Title from '../Title';

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
      <MuiGrid xs={12} item>
        <Breadcrumbs isLoading={isLoading} items={breadcrumbItems} />
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Title
          isLoading={isLoading}
          page={page}
          updateTitle={updateTitle}
          updateTitleQuery={updateTitleQuery}
        />
      </MuiGrid>
      <MuiGrid sx={{ color: theme.palette.grey[700] }} xs={12} item>
        <MuiBreadcrumbs separator="•">
          {isLoading ? <MuiSkeleton width="80px" /> : statusSelector}
          {isLoading ? <MuiSkeleton width="80px" /> : prioritySelector}
          {isLoading ? (
            <MuiSkeleton width="80px" />
          ) : (
            <MuiTypography component="span" fontWeight={600} variant="body2">
              {type[0].toUpperCase()}
              {type.slice(1, -1)}
            </MuiTypography>
          )}
          {isLoading ? (
            <MuiSkeleton width="80px" />
          ) : (
            <MuiTypography component="span" fontWeight={600} variant="body2">
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

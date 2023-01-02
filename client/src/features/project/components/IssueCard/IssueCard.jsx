/* eslint-disable react/prop-types */
import React from 'react';

import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiPestControlIcon from '@mui/icons-material/PestControl';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../../config/mui.config';

import Chip from '../../../../common/Chip/Chip';

function IssueCard({
  title,
  count,
  weeklyCount,
  color,
  backgroundColor,
  isLoading,
}) {
  return (
    <MuiBox>
      {isLoading ? (
        <MuiSkeleton
          height="90px"
          sx={{ borderRadius: '6px' }}
          variant="rectangular"
        />
      ) : (
        <MuiGrid
          sx={{
            cursor: 'pointer',
            border: `2px solid ${backgroundColor || theme.palette.grey[1400]}`,
            padding: 2,
            minHeight: '60px',
            borderRadius: '10px',
            backgroundColor: backgroundColor || theme.palette.common.white,
            transition: 'all 0.25s ease-in-out',
            '&:hover': {
              boxShadow: theme.shadows[1],
              border: `2px solid ${
                backgroundColor
                  ? theme.palette.primary[700]
                  : theme.palette.grey[1300]
              }`,
              backgroundColor: backgroundColor
                ? theme.palette.primary[700]
                : theme.palette.grey[1300],
            },
          }}
          container
        >
          <MuiGrid display="flex" xs={12} item>
            <MuiTypography
              fontWeight={600}
              sx={{
                color: color || theme.palette.grey[600],
                flexGrow: 1,
                textTransform: 'capitalize',
              }}
              variant="body2"
            >
              {title}
            </MuiTypography>
            <MuiPestControlIcon
              sx={{ color: color || theme.palette.grey[1000] }}
            />
          </MuiGrid>
          <MuiGrid xs={12} item>
            <MuiTypography
              sx={{
                fontFamily: 'Roboto Mono',
                fontWeight: 500,
                color: color || theme.palette.grey[600],
              }}
              variant="h4"
            >
              {count}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid xs={12} item>
            <MuiTypography
              sx={{
                marginTop: '8px',
                fontWeight: 500,
                color: color || theme.palette.grey[800],
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
              }}
              variant="body2"
            >
              {weeklyCount > 0 ? (
                <Chip
                  backgroundColor={theme.palette.green[1500]}
                  color={theme.palette.green[900]}
                  label={`+${weeklyCount}`}
                />
              ) : (
                <Chip
                  backgroundColor={theme.palette.grey[1400]}
                  color={theme.palette.grey[900]}
                  label={`${weeklyCount}`}
                />
              )}
              <MuiTypography sx={{ paddingLeft: 0.5 }} variant="body2">
                this week
              </MuiTypography>
            </MuiTypography>
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiBox>
  );
}

export default IssueCard;

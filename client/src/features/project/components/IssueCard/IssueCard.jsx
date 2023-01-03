/* eslint-disable react/prop-types */
import React from 'react';

import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiPestControlIcon from '@mui/icons-material/PestControl';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../../config/mui.config';

import Chip from '../../../../common/Chip';

function IssueCard({
  color,
  count,
  title,
  weeklyCount,
  surfaceColor,
  isLoading,
}) {
  return (
    <MuiBox component="div">
      {isLoading ? (
        <MuiSkeleton
          height="90px"
          sx={{ borderRadius: theme.shape.borderRadiusMedium }}
          variant="rectangular"
        />
      ) : (
        <MuiGrid
          sx={{
            cursor: 'pointer',
            border: `2px solid ${surfaceColor || theme.palette.grey[1400]}`,
            padding: 2,
            minHeight: '60px',
            borderRadius: '10px',
            bgcolor: surfaceColor || theme.palette.common.white,
            transition: 'all 0.25s ease-in-out',
            '&:hover': {
              boxShadow: theme.shadows[1],
              border: `2px solid ${
                surfaceColor
                  ? theme.palette.primary[700]
                  : theme.palette.grey[1300]
              }`,
              bgcolor: surfaceColor
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
            <MuiGrid
              sx={{ marginTop: '8px', alignItems: 'center', color }}
              container
            >
              <MuiGrid item>
                {weeklyCount > 0 ? (
                  <Chip
                    color={theme.palette.red[1000]}
                    label={`+${weeklyCount}`}
                    surfaceColor={theme.palette.red[1300]}
                  />
                ) : (
                  <Chip
                    color={theme.palette.grey[1000]}
                    label={`${weeklyCount}`}
                    surfaceColor={theme.palette.grey[1400]}
                  />
                )}
              </MuiGrid>
              <MuiTypography
                sx={{
                  fontWeight: 400,
                  marginLeft: '6px',
                  color: color || theme.palette.grey[900],
                }}
                variant="body2"
              >
                this week
              </MuiTypography>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiBox>
  );
}

export default IssueCard;

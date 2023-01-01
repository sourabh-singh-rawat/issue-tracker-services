/* eslint-disable react/prop-types */
import React from 'react';
import MuiBox from '@mui/material/Box';
import MuiDivider from '@mui/material/Divider';
import MuiTypography from '@mui/material/Typography';
import MuiGrid from '@mui/material/Grid';
import theme from '../../../../config/mui.config';
import Setting from '../../../../common/Setting';
import TextField from '../../../../common/TextField';

export default function CoreSettings({ id, isLoading, ownerId }) {
  return (
    <>
      <MuiBox sx={{ paddingBottom: 3 }}>
        <MuiTypography fontWeight={600} variant="body1">
          Core Settings
        </MuiTypography>
        <MuiTypography variant="body2">
          These settings cannot be changed.
        </MuiTypography>
      </MuiBox>
      <MuiGrid
        padding={3}
        rowSpacing={1}
        sx={{
          borderRadius: 3,
          width: '100%',
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.grey[300]}`,
        }}
        container
      >
        <MuiGrid xs={12} item>
          <Setting title="Owner Identifier">
            <TextField
              isLoading={isLoading}
              name="ownerId"
              value={ownerId}
              disabled
            />
          </Setting>
          <MuiDivider />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Setting title="Project Identifier">
            <TextField isLoading={isLoading} name="id" value={id} disabled />
          </Setting>
        </MuiGrid>
      </MuiGrid>
    </>
  );
}

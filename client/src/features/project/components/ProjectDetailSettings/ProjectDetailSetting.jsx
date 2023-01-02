/* eslint-disable react/prop-types */
import React from 'react';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import MuiBox from '@mui/material/Box';
import MuiDivider from '@mui/material/Divider';
import TextField from '../../../../common/TextField';
import Setting from '../../../../common/Setting';
import ProjectStatusSelector from '../ProjectStatusSelector';
import theme from '../../../../config/mui.config';

export default function ProjectDetailSetting({
  name,
  status,
  description,
  handleChange,
  isLoading,
}) {
  return (
    <>
      <MuiBox sx={{ paddingBottom: 3 }}>
        <MuiTypography fontWeight={600} variant="body1">
          Project Details
        </MuiTypography>
        <MuiTypography variant="body2">
          Overview of the project and its current status.
        </MuiTypography>
      </MuiBox>
      <MuiGrid
        padding={2}
        rowSpacing={1}
        sx={{
          borderRadius: 3,
          width: '100%',
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.grey[1200]}`,
        }}
        container
      >
        <MuiGrid xs={12} item>
          <Setting title="Name">
            <TextField
              helperText="The name of your project. Max character count is 50"
              isLoading={isLoading}
              name="name"
              value={name}
              required
              onChange={handleChange}
            />
          </Setting>
          <MuiDivider />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Setting title="Status">
            <ProjectStatusSelector
              handleChange={handleChange}
              helperText="The current status of your project."
              value={status}
            />
          </Setting>
          <MuiDivider />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Setting title="Description">
            <TextField
              helperText="A free text description of the project. Max character count is 150"
              isLoading={isLoading}
              minRows={6}
              name="description"
              value={description}
              multiline
              onChange={handleChange}
            />
          </Setting>
        </MuiGrid>
      </MuiGrid>
    </>
  );
}

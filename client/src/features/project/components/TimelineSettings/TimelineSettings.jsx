/* eslint-disable react/prop-types */
import React from 'react';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiDivider from '@mui/material/Divider';
import MuiTypography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import theme from '../../../../config/mui.config';
import TextField from '../../../../common/TextField';
import Setting from '../../../../common/Setting';
import DatePicker from '../../../../common/DatePicker';

export default function TimelineSettings({
  createdAt,
  startDate,
  endDate,
  isLoading,
  handleStartDateChange,
  handleEndDateChange,
}) {
  return (
    <>
      <MuiBox sx={{ paddingBottom: 3 }}>
        <MuiTypography fontWeight={600} variant="body1">
          Timeline Settings
        </MuiTypography>
        <MuiTypography variant="body2">
          These settings related to timeline of project.
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
          <Setting title="Creation date">
            <TextField
              helperText="This project was created on this day."
              isLoading={isLoading}
              name="createdAt"
              value={
                createdAt ? format(parseISO(createdAt), 'PPPPpppp') : 'loading'
              }
              disabled
            />
          </Setting>
          <MuiDivider />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Setting title="Start Date">
            <DatePicker
              handleChange={handleStartDateChange}
              helperText="The day your project started."
              isLoading={isLoading}
              maxDate={parseISO(endDate)}
              name="startDate"
              value={parseISO(startDate)}
              onChange={handleStartDateChange}
            />
          </Setting>
          <MuiDivider />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Setting title="End Date">
            <DatePicker
              handleChange={handleStartDateChange}
              helperText="The day your project will end. (due date)"
              isLoading={isLoading}
              minDate={parseISO(startDate)}
              name="endDate"
              value={parseISO(endDate)}
              onChange={handleEndDateChange}
            />
          </Setting>
        </MuiGrid>
      </MuiGrid>
    </>
  );
}

/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

import MuiGrid from '@mui/material/Grid';
import MuiAvatar from '@mui/material/Avatar';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../../config/mui.config';

import List from '../../../../common/List';
import SelectAssigneeEditCell from '../SelectAssigneeEditCell';
import StatusAndPrioritySelectorEditCell from '../StatusAndPrioritySelectorEditCell';

import {
  resetIssueList,
  setIssueList,
  updateIssueList,
} from '../../issue-list.slice';
import { useGetIssuesQuery } from '../../issue-list.api';
import { setIssuePriority, setIssueStatus } from '../../../issue/issue.slice';
import {
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
} from '../../../issue/issue.api';

function IssueList({ projectId }) {
  const dispatch = useDispatch();
  const reporterId = useSelector((store) => store.auth.user.uid);
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList,
  );

  const getIssuesQuery = useGetIssuesQuery({
    projectId,
    page,
    pageSize,
    sortBy: 'issues.createdAt:desc',
    reporterId,
  });
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();

  useEffect(() => {
    if (getIssuesQuery.data) dispatch(setIssueList(getIssuesQuery.data));
  }, [pageSize, page, getIssuesQuery.data]);

  useEffect(() => {
    if (issueStatus.isSuccess) {
      dispatch(setIssueStatus(issueStatus.data));
    }
  }, [issueStatus]);

  useEffect(() => {
    if (issuePriority.isSuccess) {
      dispatch(setIssuePriority(issuePriority.data));
    }
  }, [issuePriority]);

  // on component unmount reset the issue list slice
  useEffect(
    () => () => {
      dispatch(resetIssueList());
    },
    [],
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.3,
      minWidth: 350,
      renderCell: (params) => (
        <Link
          style={{
            overflow: 'hidden',
            textDecoration: 'none',
          }}
          to={`/issues/${params.row.id}/overview`}
        >
          <MuiTypography
            sx={{
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: theme.palette.text.primary,
              '&:hover': {
                color: theme.palette.primary[800],
                textDecoration: 'none!important',
              },
            }}
            variant="body2"
          >
            {params.row.name}
          </MuiTypography>
        </Link>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      renderCell: (params) => <StatusAndPrioritySelectorEditCell {...params} />,
      renderEditCell: (params) => (
        <StatusAndPrioritySelectorEditCell {...params} />
      ),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 150,
      editable: true,
      renderCell: (params) => <StatusAndPrioritySelectorEditCell {...params} />,
      renderEditCell: (params) => (
        <StatusAndPrioritySelectorEditCell {...params} />
      ),
    },
    {
      field: 'assigneeId',
      headerName: 'Assignee',
      width: 250,
      editable: true,
      renderCell: (params) => <SelectAssigneeEditCell {...params} />,
      renderEditCell: (params) => <SelectAssigneeEditCell {...params} />,
    },
    {
      field: 'reporterId',
      headerName: 'Reporter',
      width: 200,
      renderCell: (params) => (
        <MuiMenuItem
          sx={{
            color: theme.palette.secondary.main,
            ':hover': {
              color: theme.palette.primary[800],
              backgroundColor: 'transparent',
            },
          }}
          disableGutters
          disableRipple
        >
          <MuiGrid container>
            <MuiGrid item>
              <MuiAvatar
                src={params.row.reporterPhotoUrl}
                sx={{
                  width: '20px',
                  height: '20px',
                  marginRight: 1,
                  backgroundColor: theme.palette.grey[500],
                }}
              />
            </MuiGrid>
            <MuiGrid item>
              <MuiTypography sx={{ fontSize: '13px', fontWeight: 600 }}>
                {params.row.reporterName}
              </MuiTypography>
            </MuiGrid>
          </MuiGrid>
        </MuiMenuItem>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 125,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography
            sx={{
              color: theme.palette.grey[700],
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 600,
              fontSize: '13px',
            }}
            variant="body2"
          >
            {format(parseISO(value), 'PP')}
          </MuiTypography>
        ) : (
          '-'
        ),
    },
    {
      field: 'projectId',
      headerName: 'Project Id',
      width: 125,
      renderCell: ({ value }) => (
        <MuiTypography
          sx={{
            color: theme.palette.grey[700],
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 600,
            fontSize: '13px',
          }}
          variant="body2"
        >
          {value}
        </MuiTypography>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 125,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography
            sx={{
              color: theme.palette.grey[700],
              fontSize: '13px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 600,
            }}
            variant="body2"
          >
            {format(parseISO(value), 'PP')}
          </MuiTypography>
        ) : (
          '-'
        ),
    },
    {
      field: 'id',
      headerName: 'Issue Id',
      minWidth: 125,
      renderCell: ({ value }) => (
        <MuiTypography
          sx={{
            color: theme.palette.grey[700],
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 600,
            fontSize: '13px',
          }}
          variant="body2"
        >
          {value}
        </MuiTypography>
      ),
    },
  ];

  return (
    <List
      columns={columns}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: 'status', sort: 'desc' }] },
      }}
      isLoading={getIssuesQuery.isLoading}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      rows={rows}
      autoHeight
      onPageChange={(newPage) => dispatch(updateIssueList({ page: newPage }))}
      onPageSizeChange={(newSize) =>
        dispatch(updateIssueList({ pageSize: newSize }))
      }
    />
  );
}

export default IssueList;

/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { enIN } from 'date-fns/esm/locale';
import { format, parseISO } from 'date-fns';
import { useGridApiContext } from '@mui/x-data-grid';

import MuiTypography from '@mui/material/Typography';

import List from '../../../../common/List';
import ProjectActionsButton from '../ProjectActionsButton';
import ProjectStatusSelector from '../../../project/components/ProjectStatusSelector';

import {
  useGetStatusQuery,
  useUpdateProjectMutation,
} from '../../../project/project.api';
import { useGetProjectsQuery } from '../../project-list.api';

import theme from '../../../../config/mui.config';
import { setStatus } from '../../../project/project.slice';
import { setMessageBarOpen } from '../../../message-bar/message-bar.slice';
import { setProjectList, updateProjectList } from '../../project-list.slice';

function ProjectList() {
  const dispatch = useDispatch();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.projectList,
  );
  const getStatusQuery = useGetStatusQuery();
  const getProjectsQuery = useGetProjectsQuery({
    page,
    pageSize,
    sortBy: 'created_at:desc',
  });

  useEffect(() => {
    if (getStatusQuery.data) dispatch(setStatus(getStatusQuery.data));
  }, [getStatusQuery.data]);

  useEffect(() => {
    if (getProjectsQuery.isSuccess) {
      dispatch(setProjectList(getProjectsQuery.data));
    }
  }, [pageSize, page, getProjectsQuery.data]);

  // eslint-disable-next-line react/no-unstable-nested-components
  function SelectEditInputCell({ id, value, field }) {
    const apiRef = useGridApiContext();
    const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();

    const handleChange = async (event) => {
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      await updateProjectMutation({
        id,
        body: { [field]: event.target.value },
      });

      if (isValid) apiRef.current.stopCellEditMode({ id, field });
    };

    useEffect(() => {
      if (isSuccess) dispatch(setMessageBarOpen(true));
    }, [isSuccess]);

    return <ProjectStatusSelector handleChange={handleChange} value={value} />;
  }

  const renderSelectEditInputCell = (params) => (
    <SelectEditInputCell {...params} />
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 300,
      flex: 0.45,
      renderCell: (params) => (
        <Link
          style={{
            overflow: 'hidden',
            textDecoration: 'none',
          }}
          to={`/projects/${params.row.id}/overview`}
        >
          <MuiTypography
            sx={{
              color: theme.palette.text.primary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 500,
              ':hover': { color: theme.palette.primary[800] },
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
      minWidth: 125,
      editable: true,
      flex: 0.15,
      renderCell: (params) => renderSelectEditInputCell(params),
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      type: 'date',
      minWidth: 150,
      renderCell: ({ value, ...params }) =>
        value ? (
          <MuiTypography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 600,
              fontSize: 13,
              color: theme.palette.grey[700],
            }}
            variant="body2"
          >
            {format(parseISO(value), 'dd MMM, yyyy', { locale: enIN })}
          </MuiTypography>
        ) : (
          '-'
        ),
    },
    {
      field: 'start_date',
      headerName: 'Start Date',
      type: 'date',
      minWidth: 150,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 600,
              fontSize: 13,
              color: theme.palette.grey[700],
            }}
            variant="body2"
          >
            {format(parseISO(value), 'dd MMM, yyyy', { locale: enIN })}
          </MuiTypography>
        ) : (
          '-'
        ),
    },
    {
      field: 'end_date',
      headerName: 'End Date',
      type: 'date',
      minWidth: 150,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography
            sx={{
              overflow: 'hidden',
              fontSize: 13,
              fontWeight: 600,
              textOverflow: 'ellipsis',
              color: theme.palette.grey[700],
            }}
            variant="body2"
          >
            {format(parseISO(value), 'dd MMM, yyyy', { locale: enIN })}
          </MuiTypography>
        ) : (
          '-'
        ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: ({ id }) => <ProjectActionsButton id={id} />,
    },
  ];

  return (
    <List
      columns={columns}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
      }}
      isLoading={getProjectsQuery.isLoading}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      rows={rows}
      onPageChange={(newPage) => dispatch(updateProjectList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateProjectList({ pageSize }))}
    />
  );
}

export default ProjectList;

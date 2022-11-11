import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { enIN } from "date-fns/esm/locale";
import { format, parseISO } from "date-fns";
import { useGridApiContext } from "@mui/x-data-grid";

import MuiTypography from "@mui/material/Typography";

import List from "../../../../../common/List";
import ProjectStatusSelector from "../../../../project/components/containers/ProjectStatusSelector";
import ActionButtons from "../../buttons/ActionButtons";

import { theme } from "../../../../../app/mui.config";
import { setStatus } from "../../../../project/project.slice";
import { setSnackbarOpen } from "../../../../snackbar.reducer";
import { setProjectList, updateProjectList } from "../../../project-list.slice";

import {
  useGetStatusQuery,
  useUpdateProjectMutation,
} from "../../../../project/project.api";
import { useGetProjectsQuery } from "../../../project-list.api";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.projectList
  );
  const getStatusQuery = useGetStatusQuery();
  const getProjectsQuery = useGetProjectsQuery({
    page,
    pageSize,
    sortBy: "creation_date:desc",
  });

  useEffect(() => {
    if (getStatusQuery.data) dispatch(setStatus(getStatusQuery.data));
  }, [getStatusQuery.data]);

  useEffect(() => {
    if (getProjectsQuery.isSuccess)
      dispatch(setProjectList(getProjectsQuery.data));
  }, [pageSize, page, getProjectsQuery.data]);

  const SelectEditInputCell = ({ id, value, field }) => {
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
      if (isSuccess) dispatch(setSnackbarOpen(true));
    }, [isSuccess]);

    return <ProjectStatusSelector value={value} handleChange={handleChange} />;
  };

  const renderSelectEditInputCell = (params) => (
    <SelectEditInputCell {...params} />
  );

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 0.45,
      renderCell: (params) => (
        <Link
          to={`/projects/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <MuiTypography
            variant="body2"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 500,
              ":hover": { color: theme.palette.primary.main },
            }}
          >
            {params.row.name}
          </MuiTypography>
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 125,
      editable: true,
      flex: 0.15,
      renderCell: (params) => renderSelectEditInputCell(params),
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "creation_date",
      headerName: "Creation Date",
      type: "date",
      minWidth: 125,
      flex: 0.15,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography variant="body2">
            {format(parseISO(value), "PP", { locale: enIN })}
          </MuiTypography>
        ) : (
          "-"
        ),
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "date",
      minWidth: 125,
      flex: 0.15,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "PP", { locale: enIN }) : "-",
    },
    {
      field: "end_date",
      headerName: "End Date",
      type: "date",
      minWidth: 125,
      flex: 0.075,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "PP", { locale: enIN }) : "-",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.075,
      renderCell: ({ id }) => {
        return <ActionButtons id={id} />;
      },
    },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      isLoading={getProjectsQuery.isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => dispatch(updateProjectList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateProjectList({ pageSize }))}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
    />
  );
};

export default ProjectList;

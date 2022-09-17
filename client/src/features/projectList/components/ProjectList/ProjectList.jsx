import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { enIN } from "date-fns/esm/locale";
import { format, parseISO } from "date-fns";
import { useGridApiContext } from "@mui/x-data-grid";

import MuiTypography from "@mui/material/Typography";
import List from "../../../../common/List";
import ProjectStatusSelector from "../../../project/components/ProjectStatusSelector";
import ActionButton from "../ActionButton";

import { setStatus } from "../../../project/project.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";
import { setProjectList, updateProjectList } from "../../projectList.slice";

import {
  useGetStatusQuery,
  useUpdateProjectMutation,
} from "../../../project/project.api";
import { useGetProjectsQuery } from "../../projectList.api";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.projectList
  );
  const status = useGetStatusQuery();
  const projects = useGetProjectsQuery({
    page,
    pageSize,
    sortBy: "creation_date:desc",
  });

  useEffect(() => {
    if (status.data) dispatch(setStatus(status.data));
  }, [status.data]);

  useEffect(() => {
    if (projects.data) dispatch(setProjectList(projects.data));
  }, [pageSize, page, projects.data]);

  const SelectEditInputCell = ({ id, value, field }) => {
    const apiRef = useGridApiContext();
    const [updateProject, { error }] = useUpdateProjectMutation();

    const handleChange = async (event) => {
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      await updateProject({
        uid: id,
        payload: { [field]: event.target.value },
      });
      if (!error) dispatch(setSnackbarOpen(true));
      if (isValid) apiRef.current.stopCellEditMode({ id, field });
    };

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
              color: "text.main",
              fontWeight: 500,
              "&:hover": {
                color: "primary.main",
                textDecoration: "none!important",
              },
            }}
          >
            {params.row.name}
          </MuiTypography>
        </Link>
      ),
    },
    // {
    //   field: "id",
    //   headerName: "Id",
    //   minWidth: 75,
    //   flex: 0.1,
    // },
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
      headerName: "Created On",
      type: "date",
      minWidth: 125,
      flex: 0.15,
      renderCell: ({ value }) => format(parseISO(value), "P", { locale: enIN }),
    },
    // {
    //   field: "start_date",
    //   headerName: "Start Date",
    //   type: "date",
    //   minWidth: 150,
    //   flex: 0.14,
    //   renderCell: ({ id, field, value, row }) => {
    //     return (
    //       <StyledDatePicker
    //         name="start_date"
    //         value={value}
    //         maxDateTime={row.end_date}
    //         renderInput={dateInput}
    //         onChange={(dateSelected) => setStartDate(dateSelected)}
    //         // handleChange={handleChange}
    //         onAccept={async (date) => {
    //           const response = await fetch(
    //             `http://localhost:4000/api/projects/${id}`,
    //             {
    //               method: "PATCH",
    //               headers: { "Content-Type": "application/json" },
    //               body: JSON.stringify({ [field]: date }),
    //             }
    //           );

    //           if (response.status === 200) dispatch(setSnackbarOpen(true));
    //         }}
    //         minimized
    //       />
    //     );
    //   },
    // },
    {
      field: "end_date",
      headerName: "End Date",
      type: "date",
      minWidth: 125,
      flex: 0.075,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "P", { locale: enIN }) : "-",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.075,
      renderCell: ({ id }) => {
        return <ActionButton id={id} />;
      },
    },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={projects.isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => dispatch(updateProjectList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateProjectList({ pageSize }))}
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
    />
  );
};

export default ProjectList;

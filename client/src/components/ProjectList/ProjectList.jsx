import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enIN } from "date-fns/esm/locale";
import { format, parseISO } from "date-fns";
import { TextField, Typography } from "@mui/material";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import {
  setProjectList,
  updateProjectList,
} from "../../reducers/projectList.reducer";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import StyledSelect from "../StyledSelect/StyledSelect";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.projectList
  );
  const [isLoading, setIsLoading] = useState(false);

  // const dateInput = (props) => <TextField {...props} variant="standard" />;

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects?limit=${pageSize}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );

      const data = await response.json();
      setIsLoading(false);

      dispatch(setProjectList(data));
    })();
  }, [pageSize, page]);

  const SelectEditInputCell = ({ id, value, field }) => {
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      const response = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: event.target.value }),
      });

      if (response.status === 200) dispatch(setSnackbarOpen(true));
      if (isValid) apiRef.current.stopCellEditMode({ id, field });
    };

    return (
      <StyledSelect
        size="small"
        name="status"
        value={value}
        onChange={handleChange}
        items={["Not Started", "Open", "Completed", "Paused"]}
        defaultValue="Not Started"
      />
    );
  };

  const renderSelectEditInputCell = (params) => (
    <SelectEditInputCell {...params} />
  );

  // COLUMN DEFINTIONS
  const columns = [
    {
      field: "name",
      headerName: "NAME",
      minWidth: 300,
      flex: 0.35,
      renderCell: (params) => (
        <Link
          to={`/projects/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "text.subtitle1",
              fontWeight: "bold",
              "&:hover": {
                color: "primary.main",
                textDecoration: "none!important",
              },
            }}
          >
            {params.row.name}
          </Typography>
        </Link>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      minWidth: 75,
      flex: 0.1,
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 125,
      editable: true,
      flex: 0.15,
      renderCell: (params) => renderSelectEditInputCell(params),
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "creation_date",
      headerName: "CREATED ON",
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
      headerName: "END DATE",
      type: "date",
      minWidth: 125,
      flex: 0.15,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "P", { locale: enIN }) : "-",
    },
  ];

  return (
    <DataGrid
      experimentalFeatures={{ newEditingApi: true }}
      columns={columns}
      rows={rows}
      rowCount={rowCount}
      rowsPerPageOptions={[10, 20, 50, 100]}
      pagination
      paginationMode="server"
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => dispatch(updateProjectList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateProjectList({ pageSize }))}
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      sx={{
        border: 0,
        fontSize: "inherit",
        color: "primary.text2",
        ".MuiDataGrid-cell": {
          border: 0,
          color: "text.subtitle1",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        ".MuiDataGrid-columnHeaders": {
          borderBottom: "2px solid #343a27",
        },
        ".MuiDataGrid-columnSeparator": {
          display: "none",
        },
      }}
    />
  );
};

export default ProjectList;

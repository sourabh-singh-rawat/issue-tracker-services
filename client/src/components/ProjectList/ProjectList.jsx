import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import { TextField, Typography } from "@mui/material";
import { setProjectList } from "../../redux/project-list/project-list.reducer";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.reducer";
import StyledSelect from "../StyledSelect/StyledSelect";
import StyledDatePicker from "../StyledDatePicker/StyledDatePicker";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((store) => store.projectList);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dateInput = (props) => <TextField {...props} variant="standard" />;

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
        },
      });
      const data = await response.json();
      dispatch(setProjectList(data));
    })();
  }, [setStartDate, setEndDate]);

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
        defaultValue={"Not Started"}
        sx={{ fontSize: "14px" }}
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
      headerName: "Name",
      minWidth: 300,
      flex: 0.3,
      renderCell: (params) => (
        <Link
          to={`/projects/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body2"
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
      flex: 0.14,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      editable: true,
      flex: 0.14,
      renderCell: (params) => renderSelectEditInputCell(params),
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "creation_date",
      headerName: "Created On",
      type: "date",
      minWidth: 175,
      flex: 0.14,
      renderCell: ({ value }) => format(parseISO(value), "eee, PP"),
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
      minWidth: 150,
      flex: 0.14,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "eee, PP") : "-",
    },
  ];

  return (
    <DataGrid
      rows={projects}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      rowsPerPageOptions={[10, 20, 50, 100]}
      initialState={{
        sorting: { sortModel: [{ field: "creation_date", sort: "asc" }] },
      }}
      autoHeight
      disableColumnMenu={true}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      sx={{
        border: 0,
        color: "primary.text2",
        ".MuiDataGrid-cell": {
          border: 0,
          fontSize: "14px",
          color: "text.subtitle1",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
          fontSize: "16px",
        },
      }}
    />
  );
};

export default ProjectList;

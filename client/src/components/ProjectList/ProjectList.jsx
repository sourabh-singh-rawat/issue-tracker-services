import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { parseISO } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enIN } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import {
  Select,
  MenuItem,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { setProjectList } from "../../redux/project-list/project-list.reducer";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.reducer";
import { DatePicker } from "@mui/x-date-pickers";
import StyledSelect from "../StyledSelect/StyledSelect";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projectList = useSelector((store) => store.projectList);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dateInput = (props) => <TextField {...props} variant="standard" />;
  const handleStartDateChange = (dateSelected) => setStartDate(dateSelected);
  const handleEndDateChange = (dateSelected) => setEndDate(dateSelected);

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
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/projects/${params.row.id}/overview`}>
          <Typography variant="body1" sx={{ color: "primary.text3" }}>
            {params.row.name}
          </Typography>
        </Link>
      ),
    },
    {
      field: "id",
      headerName: "Id",
      minWidth: 50,
      align: "center",
      headerAlign: "center",
      flex: 0.1,
    },
    {
      field: "owner_email",
      headerName: "Owner",
      minWidth: 250,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      editable: true,
      renderCell: (params) => renderSelectEditInputCell(params),
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "date",
      flex: 0.15,
      minWidth: 150,
      renderCell: ({ id, field, value, row }) => {
        return (
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enIN}
          >
            <DatePicker
              value={startDate || value}
              maxDateTime={parseISO(row.end_date)}
              renderInput={dateInput}
              onChange={handleStartDateChange}
              onAccept={async (date) => {
                const response = await fetch(
                  `http://localhost:4000/api/projects/${id}`,
                  {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ [field]: date }),
                  }
                );

                if (response.status === 200) dispatch(setSnackbarOpen(true));
              }}
            />
          </LocalizationProvider>
        );
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      type: "date",
      flex: 0.15,
      minWidth: 150,
      renderCell: ({ id, field, value, row }) => {
        return (
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enIN}
          >
            <DatePicker
              value={endDate || value}
              minDateTime={row.start_date}
              renderInput={dateInput}
              onChange={handleEndDateChange}
              onAccept={async (date) => {
                const response = await fetch(
                  `http://localhost:4000/api/projects/${id}`,
                  {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ [field]: date }),
                  }
                );
                if (response.status === 200) dispatch(setSnackbarOpen(true));
              }}
            />
          </LocalizationProvider>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={projectList.projects}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      rowsPerPageOptions={[10, 20, 50, 100]}
      initialState={{ sorting: { sortModel: [{ field: "id", sort: "asc" }] } }}
      autoHeight
      disableColumnMenu={true}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      sx={{
        border: 0,
        fontSize: "inherit",
        color: "primary.text2",
        ".MuiDataGrid-cell": { border: 0, color: "primary.text3" },
      }}
    />
  );
};

export default ProjectList;

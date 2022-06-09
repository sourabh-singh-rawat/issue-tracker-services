import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import {
  MenuItem,
  Typography,
  Select,
  Button,
  FormControl,
} from "@mui/material";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.action-creator";
import { setProjectList } from "../../redux/project-list/project-list.action-creator";
import { selectProjects } from "../../redux/project-list/project-list.selector";

const ProjectList = (props) => {
  let [pageSize, setPageSize] = useState(10);

  const { dispatch, projectList } = props;
  // create a class  using mui

  const SelectEditInputCell = (props) => {
    const apiRef = useGridApiContext();
    const { id, value, field } = props;

    const handleChange = async (event) => {
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      const response = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value: event.target.value }),
      });
      if (response.status === 200) dispatch(setSnackbarOpen());
      if (isValid) apiRef.current.stopCellEditMode({ id, field });
    };

    return (
      <FormControl size="small" fullWidth>
        <Select value={value} onChange={handleChange} fullWidth>
          {["On Going", "Completed", "Proposed"].map((text) => (
            <MenuItem value={text} key={text}>
              <Typography variant="body2">{text}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const renderSelectEditInputCell = (params) => {
    return <SelectEditInputCell {...params} />;
  };

  const handleCellEditStop = async (params, e) => {
    const id = params.id;
    const field = params.field;
    const old = params.value;
    const value = e.target.value;

    if (value && old !== value) {
      const response = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value }),
      });

      if (response.status === 200) dispatch(setSnackbarOpen());
    }
  };

  const renderNameCell = (params) => {
    return (
      <Link to={`/projects/${params.row.id}/overview`}>
        <Typography variant="body1" sx={{ color: "primary.text3" }}>
          {params.row.name}
        </Typography>
      </Link>
    );
  };

  const renderDateCell = (params) => {
    return new Date(params.value).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // COLUMN DEFINTIONS
  const nameCol = {
    field: "name",
    headerName: "Name",
    minWidth: 325,
    editable: true,
    flex: 0.8,
    renderCell: renderNameCell,
  };

  const idCol = {
    field: "id",
    headerName: "Id",
    minWidth: 75,
    align: "center",
    headerAlign: "center",
    flex: 0.15,
  };

  const ownerEmailCol = {
    field: "owner_email",
    headerName: "Owner",
    minWidth: 250,
  };

  const statusCol = {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    editable: "true",
    renderCell: (params) => {
      return renderSelectEditInputCell(params);
    },
    renderEditCell: renderSelectEditInputCell,
  };

  const startDateCol = {
    field: "start_date",
    headerName: "Start Date",
    minWidth: 125,
    editable: true,
    type: "date",
    renderCell: renderDateCell,
  };

  const endDateCol = {
    field: "end_date",
    headerName: "End Date",
    minWidth: 125,
    editable: true,
    type: "date",
    renderCell: renderDateCell,
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(setProjectList(data));
    })();
  }, []);

  return (
    <DataGrid
      rows={projectList}
      columns={[
        nameCol,
        idCol,
        ownerEmailCol,
        statusCol,
        startDateCol,
        endDateCol,
      ]}
      pageSize={pageSize}
      onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      rowsPerPageOptions={[10, 20, 50, 100]}
      initialState={{ sorting: { sortModel: [{ field: "id", sort: "asc" }] } }}
      onCellEditStop={handleCellEditStop}
      autoHeight
      checkboxSelection
      experimentalFeatures={{ newEditingApi: true }}
      disableColumnMenu={true}
      disableSelectionOnClick
      sx={{
        border: 0,
        fontSize: "inherit",
        color: "primary.text2",
        ".MuiDataGrid-cell": {
          border: 0,
          color: "primary.text3",
        },
      }}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    snackbar: store.snackbar,
    projectList: selectProjects(store),
  };
};

export default connect(mapStateToProps)(ProjectList);

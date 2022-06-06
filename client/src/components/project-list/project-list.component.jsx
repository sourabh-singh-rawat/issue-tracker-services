import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import { MenuItem, Typography, Select } from "@mui/material";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.action-creator";
import { setProjectList } from "../../redux/project-list/project-list.action-creator";

const ProjectList = (props) => {
  const { dispatch, projectList, size, dashboard } = props;

  const SelectEditInputCell = (props) => {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      fetch(`http://localhost:4000/api/project/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value: event.target.value }),
      }).then((response) => {
        if (response.status === 200) dispatch(setSnackbarOpen());
      });
    };

    return (
      <Select
        value={value || ""}
        onChange={handleChange}
        displayEmpty
        autoFocus
        fullWidth
      >
        <MenuItem value="In Progress">
          <Typography variant="body2">In Progress</Typography>
        </MenuItem>
        <MenuItem value="Finished">
          <Typography variant="body2">Finished</Typography>
        </MenuItem>
        <MenuItem value="Proposed">
          <Typography variant="body2">Proposed</Typography>
        </MenuItem>
      </Select>
    );
  };

  const renderSelectEditInputCell = (params) => {
    return <SelectEditInputCell {...params} />;
  };

  const handleCellEditStop = (params, e) => {
    const id = params.id;
    const field = params.field;
    const old = params.value;
    const value = e.target.value;

    if (value && old !== value) {
      // send update request to the server
      fetch(`http://localhost:4000/api/project/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value }),
      }).then((response) => {
        if (response.status === 200) dispatch(setSnackbarOpen());
      });
    }
  };

  const renderNameCell = (params) => {
    return (
      <Link to={`/project/${params.row.id}/overview`}>
        <Typography
          variant="body2"
          sx={{
            color: "primary.text2",
            ":hover": {
              color: "primary.main",
            },
            ":focus": {
              color: "primary.main",
            },
          }}
        >
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

  // column definitions
  const columns1 = [
    {
      field: "id",
      headerName: "#",
      width: 50,
      align: "center",
      headerAlign: "center",
      flex: 0.1,
    },
    {
      editable: true,
      field: "name",
      headerName: "Name",
      flex: 0.65,
      renderCell: renderNameCell,
    },
    { field: "issues", headerName: "Issues", flex: 0.25 },
  ];
  const columns2 = [
    {
      field: "id",
      headerName: "#",
      minWidth: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      editable: true,
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 325,
      renderCell: renderNameCell,
    },
    {
      field: "owner_email",
      headerName: "Owner",
      minWidth: 250,
    },
    {
      editable: true,
      field: "status",
      headerName: "Status",
      renderEditCell: renderSelectEditInputCell,
      minWidth: 125,
    },
    { field: "issues", headerName: "Issues" },
    {
      editable: true,
      field: "start_date",
      headerName: "Start Date",
      minWidth: 125,
      type: "date",
      renderCell: renderDateCell,
    },
    {
      editable: true,
      field: "end_date",
      minWidth: 125,
      headerName: "End Date",
      type: "date",
      renderCell: renderDateCell,
    },
  ];
  const columns = dashboard ? columns1 : columns2;

  useEffect(() => {
    fetch("http://localhost:4000/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch(setProjectList(data)));
  }, []);

  return (
    <DataGrid
      rows={projectList}
      columns={columns}
      pageSize={size}
      rowsPerPageOptions={[10]}
      disableSelectionOnClick
      initialState={{
        sorting: { sortModel: [{ field: "id", sort: "asc" }] },
      }}
      onCellEditStop={handleCellEditStop}
      sx={{
        border: 0,
        boxShadow: 0,
        overflow: "hidden",
        "& .MuiDataGrid-cell": dashboard && {
          border: 0,
        },
      }}
      hideFooter={dashboard}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    snackbar: store.snackbar,
    projectList: store.projectList.projects,
  };
};

export default connect(mapStateToProps)(ProjectList);

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";
import { MenuItem, Typography } from "@mui/material";
import StyledSnackbar from "../../components/styled-snackbar/styled-snackbar.component";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.action-creator";
import { setIssueList } from "../../redux/issues-list/issue-list.action-creator";

const Projects = (props) => {
  const { dispatch, issueList } = props;

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

  // column definitions
  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 325,
      renderCell: (params) => {
        return (
          <Link to={`/project/${params.row.id}/overview`}>
            {params.row.name}
          </Link>
        );
      },
      editable: true,
    },
    {
      field: "owner_email",
      headerName: "Owner",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      renderEditCell: renderSelectEditInputCell,
      editable: true,
      width: 180,
    },
    { field: "issues", headerName: "Issues" },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
      type: "date",
      renderCell: (params) => {
        return new Date(params.value).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      editable: true,
    },
    {
      field: "end_date",
      width: 150,
      headerName: "End Date",
      type: "date",
      renderCell: (params) => {
        return new Date(params.value).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      editable: true,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:4000/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch(setIssueList(data)));
  }, []);

  return (
    <Box>
      <Grid container sx={{ height: "80vh" }}>
        <Grid item xs={12}>
          <StyledAppBar button={{ to: "/project/create", p: "Create project" }}>
            Projects
          </StyledAppBar>
          <DataGrid
            rows={issueList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            onCellEditStop={handleCellEditStop}
            initialState={{
              sorting: {
                sortModel: [{ field: "id", sort: "asc" }],
              },
            }}
            sx={{
              marginRight: 3,
              marginLeft: 3,
              border: "2px solid rgb(244, 244, 244)",
            }}
          />
        </Grid>
      </Grid>
      {/* snackbar updated */}
      <StyledSnackbar />
    </Box>
  );
};

const mapStateToProps = (store) => {
  return {
    snackbar: store.snackbar,
    issueList: store.issueList.issues,
  };
};

export default connect(mapStateToProps)(Projects);

import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";

const Projects = () => {
  const [rows, setRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // snackbar
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // snackbar action
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleCellEditStop = (params, e) => {
    const id = params.id;
    const field = params.field;
    const oldVal = params.value;
    const newVal = e.target.value;

    if (newVal && oldVal !== newVal) {
      // send update request to the server
      const putData = async () => {
        const response = await fetch(
          `http://localhost:4000/api/project/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ field, newVal }),
          }
        );

        if (response.status === 200) setSnackbarOpen(true);
      };

      putData();
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
    { field: "status", headerName: "Status" },
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

  // fetch all projects
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:4000/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      console.log(data);
      setRows(data);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Grid container sx={{ height: "80vh" }}>
        <Grid item xs={12}>
          <StyledAppBar button={{ to: "/project/create", p: "Create project" }}>
            Projects
          </StyledAppBar>
          <DataGrid
            rows={rows}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        action={action}
        onClose={handleSnackbarClose}
        message="Updated"
      />
    </Box>
  );
};

export default Projects;

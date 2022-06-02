import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppBarContainer from "../../components/appbar/appbar.component";

const Projects = () => {
  const [rows, setRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // snackbar
  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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
    const fieldId = params.id;
    const newFieldValue = e.target.value;
    const previousFieldValue = params.formattedValue;

    if (newFieldValue && previousFieldValue !== newFieldValue) {
      // send update request to the server
      const putData = async () => {
        await fetch(`http://localhost:4000/api/project/${fieldId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newFieldValue }),
        });

        setSnackbarOpen(true);
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
        return <Link to={`/project/${params.row.id}`}>{params.row.name}</Link>;
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
      renderCell: (params) => {
        return new Date(params.value).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      field: "end_date",
      width: 150,
      headerName: "End Date",
      renderCell: (params) => {
        return new Date(params.value).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
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

      setRows(data);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Grid container sx={{ height: "80vh" }}>
        <Grid item xs={12}>
          <AppBarContainer
            element={<Link to="/project/create">Create project</Link>}
          >
            Projects
          </AppBarContainer>
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

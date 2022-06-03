import { Fragment, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssuesList = () => {
  // context
  const [selectedTab, project] = useOutletContext();

  // state
  const [rows, setRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  let projectId;
  project ? (projectId = project.id) : (projectId = "");

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
    const id = params.id;
    const field = params.field;
    const oldVal = params.value;
    const newVal = e.target.value;
    const projectId = params.row.project_id;

    if (newVal && oldVal !== newVal) {
      // send update request to the server
      const putData = async () => {
        const response = await fetch(
          `http://localhost:4000/api/issue/${id}/?projectId=${projectId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ field, newVal }),
          }
        );
        console.log(response);
        if (response.status === 200) setSnackbarOpen(true);
      };

      putData();
    }
  };

  const columns = [
    {
      field: "issue_id",
      headerName: "#",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "issue_name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        return (
          <Link to={`/issue/${params.row.issue_id}`}>
            {params.row.issue_name}
          </Link>
        );
      },
      editable: true,
    },
    {
      field: "project_id",
      headerName: "Project #",
      width: 75,
      align: "center",
      headerAlign: "center",
    },
    { field: "issue_status", headerName: "Status", width: 150 },
    {
      field: "issue_reporter",
      headerName: "Reporter",
      width: 250,
    },
    {
      field: "issue_assignee",
      headerName: "Assigned To",
      width: 250,
    },
    { field: "issue_priority", headerName: "Priority", width: 150 },
    { field: "due_date", headerName: "Due Date", width: 150 },
  ];

  useEffect(() => {
    if (projectId || projectId === "") {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:4000/api/issues?project_id=${projectId}`
        );
        const data = await response.json();
        setRows(data);
      };

      fetchData();
    }
  }, [projectId]);

  return (
    <StyledTabPanel selectedTab={selectedTab} index={1}>
      <Box>
        <Grid container sx={{ height: "80vh" }}>
          <Grid item xs={12}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              getRowId={(row) => {
                return row.issue_id;
              }}
              initialState={{
                sorting: {
                  sortModel: [{ field: "issue_id", sort: "asc" }],
                },
              }}
              onCellEditStop={handleCellEditStop}
              hideFooter
            ></DataGrid>
            {/* snackbar updated */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              action={action}
              onClose={handleSnackbarClose}
              message="Updated"
            />
          </Grid>
        </Grid>
      </Box>
    </StyledTabPanel>
  );
};

export default IssuesList;

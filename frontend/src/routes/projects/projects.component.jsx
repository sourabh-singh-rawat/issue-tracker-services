import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

// MUI Styles
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import AppBarContainer from "../../components/appbar/appbar.component";
import ModalWindow from "../../components/modal-window/modal-window.component";
import ProjectForm from "../../components/project-form/project-form.component";

const Projects = (props) => {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "owner_email",
      headerName: "Owner",
      width: 250,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 200,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 200,
    },
    { field: "issues", headerName: "Issues" },
  ];

  // fetch data after the component is mounted
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
      <AppBarContainer
        element={
          <ModalWindow>
            <ProjectForm />
          </ModalWindow>
        }
      >
        Projects
      </AppBarContainer>
      <Toolbar sx={{ borderBottom: "3px solid #f4f4f4" }}>
        <Typography>All Projects</Typography>
      </Toolbar>
      <Grid container sx={{ height: "80vh" }}>
        <Grid item xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx={{ border: "none" }}
          ></DataGrid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;

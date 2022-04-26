import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

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
      headerName: "Id",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.2,
      renderCell: (params) => {
        return <Link to={`${params.row.id}/issues`}>{params.row.name}</Link>;
      },
    },
    {
      field: "owner_email",
      headerName: "Owner",
      flex: 0.2,
    },
    { field: "status", headerName: "Status" },
    { field: "issues", headerName: "Issues" },
    {
      field: "start_date",
      flex: 0.1,
      headerName: "Start Date",
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
      flex: 0.1,
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

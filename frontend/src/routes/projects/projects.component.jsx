import { Grid, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBarContainer from "../../components/appbar/appbar.component";

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
        return <Link to={`${params.row.id}`}>{params.row.name}</Link>;
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
      <AppBarContainer element={<Link to="/projects/create">Create</Link>}>
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

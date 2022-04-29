import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

const IssueDetailed = ({ projectId = "" }) => {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "issueid",
      headerName: "Id",
      width: 50,
    },
    {
      field: "issuename",
      headerName: "Name",
      width: 300,
    },
    {
      field: "projectid",
      headerName: "Project Id",
      width: 100,
    },
    { field: "issuestatus", headerName: "Status", width: 150 },
    {
      field: "issuereporter",
      headerName: "Reporter",
      width: 250,
    },
    {
      field: "issueassignee",
      headerName: "Assigned To",
      width: 250,
    },
    { field: "issuepriority", headerName: "Priority", width: 150 },
    { field: "duedate", headerName: "Due Date", width: 150 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/api/issues?project_id=${projectId}`
      );
      const data = await response.json();

      setRows(data);
    };

    fetchData();
  }, [projectId]);

  return (
    <Box>
      <Grid container sx={{ height: "80vh" }}>
        <Grid item xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx={{ border: "none" }}
            getRowId={(row) => {
              return row.issueid;
            }}
          ></DataGrid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IssueDetailed;

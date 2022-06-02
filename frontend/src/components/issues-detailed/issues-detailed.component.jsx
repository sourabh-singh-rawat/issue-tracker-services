import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssuesDetailed = () => {
  const [rows, setRows] = useState([]);
  const [selectedTab, project] = useOutletContext();
  let projectId;
  project ? (projectId = project.id) : (projectId = "");

  const columns = [
    {
      field: "issueid",
      headerName: "#",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "issuename",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        return (
          <Link to={`/issue/${params.row.issueid}`}>
            {params.row.issuename}
          </Link>
        );
      },
      editable: true,
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
                return row.issueid;
              }}
              initialState={{
                sorting: {
                  sortModel: [{ field: "issueid", sort: "asc" }],
                },
              }}
              hideFooter
            ></DataGrid>
          </Grid>
        </Grid>
      </Box>
    </StyledTabPanel>
  );
};

export default IssuesDetailed;

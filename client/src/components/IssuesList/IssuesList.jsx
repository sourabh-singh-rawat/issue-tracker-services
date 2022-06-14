import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.reducer";
import { setIssueList } from "../../redux/issues-list/issue-list.reducer";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import {
  Grid,
  Select,
  MenuItem,
  Typography,
  FormControl,
} from "@mui/material/";

const IssuesList = () => {
  const issueList = useSelector((store) => store.issueList);
  const dispatch = useDispatch();
  const [selectedTab, project] = useOutletContext();
  const [pageSize, setPageSize] = useState(10);

  let project_id;
  project ? (project_id = project.id) : (project_id = "");

  const SelectEditInputCell = (props) => {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });
      console.log(field, value);

      const response = await fetch(`http://localhost:4000/api/issues/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: event.target.value }),
      });

      if (response.status === 200) dispatch(setSnackbarOpen(true));
      if (isValid) apiRef.current.stopCellEditMode({ id, field });
    };

    let selectOptions = [];
    switch (field) {
      case "status":
        selectOptions = ["Open", "In Progress", "Closed"];
        break;
      case "priority":
        selectOptions = ["Low", "Medium", "High"];
        break;
    }

    return (
      <FormControl size="small" fullWidth>
        <Select value={value} onChange={handleChange} fullWidth>
          {selectOptions.map((value) => {
            return (
              <MenuItem value={value} key={value} sx={{ background: "none" }}>
                <Typography variant="body2">{value}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const renderSelectEditInputCell = (params) => (
    <SelectEditInputCell {...params} />
  );

  const renderNameCell = (params) => (
    <Link to={`/issues/${params.row.id}/overview`}>
      <Typography
        variant="body1"
        sx={{ textDecoration: "none", color: "primary.text" }}
      >
        {params.row.name}
      </Typography>
    </Link>
  );

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.7,
      minWidth: 500,
      renderCell: renderNameCell,
      editable: true,
    },
    {
      editable: true,
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return renderSelectEditInputCell(params);
      },
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      editable: true,
      renderCell: renderSelectEditInputCell,
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 250,
    },
    {
      field: "assigned_to",
      headerName: "Assigned To",
      width: 250,
    },
    { field: "due_date", headerName: "Due Date", width: 150 },
    {
      field: "project_id",
      headerName: "Project Id",
      width: 100,
    },
    {
      field: "creation_date",
      headerName: "creation_date",
      width: 100,
    },
  ];

  useEffect(() => {
    fetch(`http://localhost:4000/api/issues?project_id=${project_id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setIssueList(data));
      });
  }, [project_id]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          rows={issueList.issues}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
          rowsPerPageOptions={[10, 20, 50, 100]}
          getRowId={(row) => row.id}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "asc" }],
            },
          }}
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          sx={{
            border: 0,
            fontSize: "inherit",
            color: "primary.text2",
            ".MuiDataGrid-cell": {
              border: 0,
              boxShadow: 0,
              color: "primary.text3",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default IssuesList;

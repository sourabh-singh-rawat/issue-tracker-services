import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import { updateIssueList } from "../../reducers/issueList.reducer";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import { Select, MenuItem, Typography, FormControl } from "@mui/material/";
import {
  setIssueStatus,
  setIssuePriority,
} from "../../reducers/issueOptions.reducer";

const IssuesList = ({ rows, rowCount, isLoading, page, pageSize }) => {
  const dispatch = useDispatch();
  const issueStatus = useSelector((store) => store.issueOptions.issueStatus);
  const issuePriority = useSelector(
    (store) => store.issueOptions.issuePriority
  );

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
        selectOptions = issueStatus;
        break;
      case "priority":
        selectOptions = issuePriority;
        break;
    }

    return (
      <FormControl size="small" fullWidth>
        <Select
          value={value}
          onChange={handleChange}
          sx={{ color: "text.subtitle1", fontSize: "15px", fontWeight: "bold" }}
          fullWidth
        >
          {selectOptions.map(({ code, message }, index) => {
            return (
              <MenuItem
                key={code}
                value={code}
                sx={{
                  color: "text.subtitle1",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {message.toUpperCase()}
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

  useEffect(() => {
    const fetchIssueStatus = async () => {
      const response = await fetch("http://localhost:4000/api/issues/status");
      const status = await response.json();

      dispatch(setIssueStatus(status));
    };

    const fetchIssuePriority = async () => {
      const response = await fetch("http://localhost:4000/api/issues/priority");
      const priority = await response.json();

      dispatch(setIssuePriority(priority));
    };

    fetchIssueStatus();
    fetchIssuePriority();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      flex: 0.3,
      minWidth: 350,
      renderCell: (params) => (
        <Link
          to={`/issues/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "text.subtitle1",
              "&:hover": {
                color: "primary.main",
                textDecoration: "none!important",
              },
            }}
          >
            {params.row.name}
          </Typography>
        </Link>
      ),
    },
    {
      field: "reporter",
      headerName: "REPORTER",
      width: 150,
    },
    {
      field: "creation_date",
      headerName: "CREATED",
      width: 125,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "PP", { locale: enIN }) : "-",
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      editable: true,
      renderCell: renderSelectEditInputCell,
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "priority",
      headerName: "PRIORITY",
      width: 150,
      editable: true,
      renderCell: renderSelectEditInputCell,
      renderEditCell: renderSelectEditInputCell,
    },
    {
      field: "assigned_to",
      headerName: "ASSIGNED TO",
      width: 250,
    },
    {
      field: "due_date",
      headerName: "DUE DATE",
      width: 150,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "eee, PP") : "-",
    },
    {
      field: "project_id",
      headerName: "PROJECT ID",
      width: 100,
    },
    {
      field: "id",
      headerName: "ISSUE ID",
      minWidth: 100,
      flex: 0.14,
    },
  ];

  return (
    <DataGrid
      experimentalFeatures={{ newEditingApi: true }}
      columns={columns}
      rows={rows}
      rowCount={rowCount}
      rowsPerPageOptions={[10, 20, 50, 100]}
      pagination
      paginationMode="server"
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => dispatch(updateIssueList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateIssueList({ pageSize }))}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: "creation_date", sort: "desc" }] },
      }}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      sx={{
        border: 0,
        fontSize: "inherit",
        color: "primary.text2",
        ".MuiDataGrid-cell": {
          color: "text.subtitle1",
          border: "none",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: "14px",
          fontWeight: "bold",
        },
        ".MuiDataGrid-columnHeaders": {
          borderBottom: "2px solid #DFE1E6",
        },
        ".MuiDataGrid-columnSeparator": {
          display: "none",
        },
        ".MuiDataGrid-footerContainer": {
          borderTop: "2px solid #DFE1E6",
        },
      }}
    />
  );
};

export default IssuesList;

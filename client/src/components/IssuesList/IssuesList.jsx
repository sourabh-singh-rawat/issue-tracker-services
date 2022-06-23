import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import {
  setIssueList,
  updateIssueList,
} from "../../reducers/issueList.reducer";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import { Select, MenuItem, Typography, FormControl } from "@mui/material/";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";

const IssuesList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, project_id = ""] = useOutletContext();
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
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
                <Typography variant="body1">{value}</Typography>
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
    setIsLoading(true);

    (async () => {
      const response = await fetch(
        `http://localhost:4000/api/issues?limit=${pageSize}&page=${page}&project_id=${project_id}&sort_by=creation_date:desc`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setIsLoading(false);

      dispatch(setIssueList(data));
    })();
  }, [pageSize, page]);

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
    <StyledTabPanel selectedTab={selectedTab} index={101}>
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
          color: "primary.text2",
          border: 0,
          fontSize: "inherit",
          ".MuiDataGrid-cell": {
            color: "text.subtitle1",
            border: 0,
            boxShadow: 0,
          },
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          ".MuiDataGrid-columnHeaders": {
            borderBottom: "2px solid #343a27",
          },
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
      />
    </StyledTabPanel>
  );
};

export default IssuesList;

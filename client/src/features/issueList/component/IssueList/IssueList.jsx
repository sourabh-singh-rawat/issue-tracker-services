import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { enIN } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import { useGridApiContext } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import List from "../../../../common/List/List";

import IssueStatusSelector from "../../../issue/components/IssueStatusSelector/IssueStatusSelector";
import IssuePrioritySelector from "../../../issue/components/IssuePrioritySelector/IssuePrioritySelector";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import { updateIssueList } from "../../issueList.slice";

const IssuesList = ({ rows, rowCount, isLoading, page, pageSize }) => {
  const dispatch = useDispatch();

  const SelectEditInputCell = ({ id, value, field }) => {
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      console.log("running");
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      const response = await fetch(`http://localhost:4000/api/issues/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: event.target.value }),
      });

      if (response.status === 200) dispatch(setSnackbarOpen(true));
      if (isValid) apiRef.current.stopCellEditMode({ id, field });
    };

    if (field === "status")
      return <IssueStatusSelector value={value} handleChange={handleChange} />;
    if (field === "priority")
      return (
        <IssuePrioritySelector value={value} handleChange={handleChange} />
      );
  };

  const renderSelectEditInputCell = (params) => (
    <SelectEditInputCell {...params} />
  );

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 450,
      renderCell: (params) => (
        <Link
          to={`/issues/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
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
      field: "project_id",
      headerName: "Project Id",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: renderSelectEditInputCell,
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
      field: "due_date",
      headerName: "Due Date",
      width: 150,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "eee, PP") : "-",
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 150,
    },
    {
      field: "creation_date",
      headerName: "Created",
      width: 125,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "PP", { locale: enIN }) : "-",
    },
    {
      field: "assigned_to",
      headerName: "Assigned To",
      width: 250,
    },
    {
      field: "id",
      headerName: "Issue Id",
      minWidth: 100,
      flex: 0.14,
    },
  ];

  return (
    <List
      columns={columns}
      rows={rows}
      rowCount={rowCount}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => dispatch(updateIssueList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateIssueList({ pageSize }))}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: "creation_date", sort: "desc" }] },
      }}
    />
  );
};

export default IssuesList;

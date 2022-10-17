import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";
import { useGridApiContext } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import List from "../../../../common/List/List";
import IssueStatusSelector from "../../../issue/components/IssueStatusSelector/IssueStatusSelector";
import IssuePrioritySelector from "../../../issue/components/IssuePrioritySelector/IssuePrioritySelector";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import { setIssueList, updateIssueList } from "../../issueList.slice";

import { useUpdateIssueMutation } from "../../../issue/issue.api";
import { useGetIssuesQuery } from "../../issueList.api";

const IssueList = ({ projectId }) => {
  const dispatch = useDispatch();
  const reporterId = useSelector((store) => store.auth.user.uid);
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );
  const getIssuesQuery = useGetIssuesQuery({
    projectId,
    page,
    pageSize,
    sortBy: "creation_date:desc",
    reporterId,
  });
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();

  useEffect(() => {
    if (getIssuesQuery.data) dispatch(setIssueList(getIssuesQuery.data));
  }, [pageSize, page, getIssuesQuery.data]);

  const SelectEditInputCell = ({ id, value, field }) => {
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      await updateIssueMutation({
        id,
        body: { [field]: event.target.value },
      });

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

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

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
              color: "text.primary",
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
      field: "reporter_id",
      headerName: "Reporter",
      width: 150,
    },
    {
      field: "project_id",
      headerName: "Project Id",
      width: 100,
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
      flex: 0.14,
      field: "id",
      headerName: "Issue Id",
      minWidth: 100,
    },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={getIssuesQuery.isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => dispatch(updateIssueList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateIssueList({ pageSize }))}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: "status", sort: "desc" }] },
      }}
    />
  );
};

export default IssueList;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";

import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";

import List from "../../../../../common/List";
import SelectEditInputCell from "../SelectEditInputCell";
import SelectAssigneeEditCell from "../SelectAssigneeEditCell";

import { setIssueList, updateIssueList } from "../../../issue-list.slice";

import { useGetIssuesQuery } from "../../../issue-list.api";

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
    sortBy: "issues.creation_date:desc",
    reporterId,
  });

  useEffect(() => {
    if (getIssuesQuery.data) dispatch(setIssueList(getIssuesQuery.data));
  }, [pageSize, page, getIssuesQuery.data]);

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
          <MuiTypography
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
          </MuiTypography>
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: (params) => <SelectEditInputCell {...params} />,
      renderEditCell: (params) => <SelectEditInputCell {...params} />,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      editable: true,
      renderCell: (params) => <SelectEditInputCell {...params} />,
      renderEditCell: (params) => <SelectEditInputCell {...params} />,
    },
    {
      field: "assignee_id",
      headerName: "Assignee",
      width: 250,
      editable: true,
      renderCell: (params) => <SelectAssigneeEditCell {...params} />,
      renderEditCell: (params) => <SelectAssigneeEditCell {...params} />,
    },
    {
      field: "reporter_id",
      headerName: "Reporter",
      width: 200,
      renderCell: (params) => {
        return (
          <MuiMenuItem disableGutters disableRipple>
            <MuiListItemIcon>
              <MuiAvatar
                sx={{ width: "24px", height: "24px" }}
                src={params.row.photo_url}
              ></MuiAvatar>
            </MuiListItemIcon>
            <MuiListItemText>
              <MuiTypography variant="body2" sx={{ fontWeight: 500 }}>
                {params.row.reporter_name}
              </MuiTypography>
            </MuiListItemText>
          </MuiMenuItem>
        );
      },
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 150,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "eee, PP") : "-",
    },
    {
      field: "project_id",
      headerName: "Project Id",
      width: 125,
    },
    {
      field: "creation_date",
      headerName: "Created",
      width: 125,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "PP", { locale: enIN }) : "-",
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
      autoHeight
    />
  );
};

export default IssueList;

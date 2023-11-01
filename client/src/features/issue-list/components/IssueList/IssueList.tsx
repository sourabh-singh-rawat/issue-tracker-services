import React, { useState } from "react";
import { Link } from "react-router-dom";
import daysjs from "dayjs";

import MuiTypography from "@mui/material/Typography";

import StatusAndPrioritySelectorEditCell from "../StatusAndPrioritySelectorEditCell";

import { useTheme } from "@mui/material";
import List from "../../../../common/components/List";
import {
  useGetIssueListQuery,
  useGetIssuePriorityListQuery,
  useGetIssueStatusListQuery,
} from "../../../../api/generated/issue.api";
import {
  GridColDef,
  GridValidRowModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import Avatar from "../../../../common/components/Avatar";
import AvatarGroup from "../../../../common/components/AvatarGroup";
import IssueStatusSelector from "../IssueStatusSelector";
import IssuePrioritySelector from "../IssuePrioritySelector";

interface IssueListProps {
  projectId?: string;
}

function IssueList({ projectId }: IssueListProps) {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const { data: issueList, isLoading } = useGetIssueListQuery({
    projectId,
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sortBy: "updatedAt",
    sortOrder: "desc",
  });

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 350,
      renderCell: (params) => (
        <Link
          style={{
            overflow: "hidden",
            textDecoration: "none",
          }}
          to={`/issues/${params.row.id}/overview`}
        >
          <MuiTypography
            sx={{
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.primary.main,
                textDecoration: "none!important",
              },
            }}
            variant="body2"
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
      renderCell: ({ id, row, value }) => (
        <IssueStatusSelector id={id as string} row={row} value={value} />
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      renderCell: ({ id, value, row }) => (
        <IssuePrioritySelector id={id as string} value={value} row={row} />
      ),
    },
    {
      field: "assignees",
      headerName: "Assignee",
      renderCell: ({ value }) => {
        return <AvatarGroup members={value} total={value.length} />;
      },
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 200,
      renderCell: ({ value }) => (
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`/profile/${value.userId}`}
        >
          <Avatar label={value.name} photoUrl={value.photoUrl} />
          <MuiTypography
            sx={{
              pl: theme.spacing(1),
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
            variant="body2"
          >
            {value.name}
          </MuiTypography>
        </Link>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 125,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography variant="body2" noWrap>
            {daysjs(daysjs(value)).fromNow()}
          </MuiTypography>
        ) : (
          "-"
        ),
    },
    {
      field: "projectId",
      headerName: "Project Id",
      width: 125,
      renderCell: ({ value }) => (
        <MuiTypography variant="body2" noWrap>
          {value}
        </MuiTypography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 125,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography variant="body2" noWrap>
            {daysjs().to(daysjs(value))}
          </MuiTypography>
        ) : (
          "-"
        ),
    },
    {
      field: "id",
      headerName: "Issue Id",
      minWidth: 125,
      renderCell: ({ value }) => (
        <MuiTypography variant="body2" noWrap>
          {value}
        </MuiTypography>
      ),
    },
  ];

  return (
    <List
      rows={issueList?.rows}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      rowCount={issueList?.filteredRowCount}
      isLoading={isLoading}
    />
  );
}

export default IssueList;

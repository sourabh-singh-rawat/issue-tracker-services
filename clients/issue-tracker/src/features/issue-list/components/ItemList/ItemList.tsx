import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import daysjs from "dayjs";
import MuiTypography from "@mui/material/Typography";
import List from "../../../../common/components/List";
import {
  GridColDef,
  GridValidRowModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import AvatarGroup from "../../../../common/components/AvatarGroup";
import IssueStatusSelector from "../IssueStatusSelector";
import IssuePrioritySelector from "../IssuePrioritySelector";
import { useFindListItemsQuery } from "../../../../api/codegen/gql/graphql";

interface ItemListProps {
  listId: string;
}

export default function ItemList({ listId }: ItemListProps) {
  const theme = useTheme();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };
  const { data: items, loading: isLoading } = useFindListItemsQuery({
    variables: { listId },
  });

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 350,
      renderCell: (params) => (
        <Link
          style={{ overflow: "hidden", textDecoration: "none" }}
          to={params.row.id}
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
        <IssueStatusSelector
          id={id as string}
          value={value}
          options={row?.statusList}
        />
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      renderCell: ({ id, value, row }) => (
        <IssuePrioritySelector
          id={id as string}
          value={value}
          options={row?.priorityList}
        />
      ),
    },
    {
      field: "assignees",
      headerName: "Assignee",
      renderCell: ({ value }) => {
        return (
          <AvatarGroup
            onClick={() => {}}
            max={2}
            members={value?.map(({ id, user }) => ({
              id: user.id,
              name: user.displayName,
            }))}
            total={value?.length}
          />
        );
      },
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 200,
      renderCell: ({ value }) => (
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          // to={`/profile/${value.id}`}
        >
          {/* <Avatar label={value.displayName} /> */}
          <MuiTypography
            sx={{
              pl: theme.spacing(1),
              color: theme.palette.text.primary,
              "&:hover": { color: theme.palette.primary.main },
            }}
            variant="body2"
          >
            {/* {value.displayName} */}
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
      field: "project.name",
      headerName: "Project",
      width: 125,
      renderCell: ({ value }) => (
        <MuiTypography variant="body2" noWrap>
          {value}
        </MuiTypography>
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
      rows={items?.findListItems || []}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      rowCount={10}
      isLoading={isLoading}
    />
  );
}

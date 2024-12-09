import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import {
  GridColDef,
  GridPaginationModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import daysjs from "dayjs";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFindListItemsQuery } from "../../../../api/codegen/gql/graphql";
import List from "../../../../common/components/List";
import IssuePrioritySelector from "../IssuePrioritySelector";
import IssueStatusSelector from "../IssueStatusSelector";

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
          options={row.statusList}
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
          options={row.priorityList}
        />
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
  ];

  return (
    items && (
      <List
        rows={items.findListItems}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={10}
        isLoading={isLoading}
      />
    )
  );
}

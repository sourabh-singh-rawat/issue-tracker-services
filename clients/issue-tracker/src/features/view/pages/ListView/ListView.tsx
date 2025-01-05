import {
  ArchiveOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Grid2, useTheme } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import {
  Status,
  View,
  useFindListItemsQuery,
  useFindStatusesQuery,
  useFindViewQuery,
} from "../../../../api";
import { DataGrid, SpaceContext, useViewParams } from "../../../../common";
import { Link } from "../../../../common/components/base";
import { ViewLocation } from "../../ViewLocation";
import { ViewSwitcher } from "../../ViewSwitcher";

export const ListView = () => {
  const theme = useTheme();
  const { viewId } = useViewParams();
  const [view, setView] = useState<View | null>();
  const [rows, setRows] = useState<GridValidRowModel[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  useFindViewQuery({
    variables: { viewId },
    onCompleted(response) {
      setView(response.findView);
    },
  });

  useFindStatusesQuery({
    variables: { input: { listId: view?.list.id as string } },
    skip: !view?.list.id,
    onCompleted(response) {
      setStatuses(response.findStatuses);
    },
  });

  useFindListItemsQuery({
    variables: { listId: view?.list.id as string },
    skip: !view?.list.id,
    onCompleted(response) {
      setRows(response.findListItems);
    },
  });

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      type: "text",
      renderCell({ id, value }: GridRenderCellParams) {
        return <Link to={`/i/${id}`}>{value}</Link>;
      },
    },
    { field: "dueDate", headerName: "Due Date" },
    { field: "priority", headerName: "Priority" },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      type: "actions",
      getActions() {
        return [
          <GridActionsCellItem
            label="Rename"
            icon={<EditOutlined fontSize="small" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Archive"
            icon={<ArchiveOutlined fontSize="small" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Delete"
            icon={<DeleteOutlineOutlined fontSize="small" />}
            showInMenu
          />,
        ];
      },
    },
  ];

  return (
    <Grid2 container>
      <SpaceContext.Provider value={{ statuses }}>
        {view && (
          <>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                py: theme.spacing(0.75),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewLocation list={view.list} />
            </Grid2>
            <Grid2
              size={12}
              sx={{
                px: theme.spacing(2),
                borderBottom: `1px solid ${theme.palette.action.hover}`,
              }}
            >
              <ViewSwitcher listId={view.list.id} />
            </Grid2>
            <Grid2 size={12} sx={{ p: theme.spacing(2) }}>
              <DataGrid rows={rows} columns={columns} hideFooter />
            </Grid2>
          </>
        )}
      </SpaceContext.Provider>
    </Grid2>
  );
};

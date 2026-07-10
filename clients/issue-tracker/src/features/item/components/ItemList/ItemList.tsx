import {
  ArchiveOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import {
  useFindListItemsQuery,
  useFindSubItemsQuery,
} from "@generated/gql";
import { DataGrid, Link } from "@common";

interface ItemListProps {
  itemId?: string;
  listId?: string;
  filters?: ItemListFilters;
  style?: ItemListStyles;
}

interface ItemListFilters {}

interface ItemListStyles {
  showBorder?: boolean;
}

/**
 * Shows items in a list or sub items in an item
 */
export const ItemList = ({ itemId, listId, style }: ItemListProps) => {
  const listItems = useFindListItemsQuery(
    { listId: listId! },
    {
      select: (data) => data.findListItems,
      enabled: Boolean(listId) && !itemId,
    },
  );
  const subItems = useFindSubItemsQuery(
    { input: { parentItemId: itemId! } },
    {
      select: (data) => data.findSubItems,
      enabled: Boolean(itemId),
    },
  );
  const rows: GridValidRowModel[] = itemId
    ? (subItems.data ?? [])
    : (listItems.data ?? []);

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
    <DataGrid
      rows={rows}
      columns={columns}
      hideFooter
      showBorder={style?.showBorder}
    />
  );
};

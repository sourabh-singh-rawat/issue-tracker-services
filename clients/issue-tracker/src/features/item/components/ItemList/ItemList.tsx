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
import { useEffect, useState } from "react";
import {
  useFindListItemsLazyQuery,
  useFindSubItemsLazyQuery,
} from "../../../../api";
import { DataGrid } from "../../../../common";
import { Link } from "../../../../common/components/base";

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
 * @param props.itemId If provided, this will fetch sub items inside item
 * @param props.listId If provided, this will fetch only immediate list items
 * @param props.filters If provided, this will filter items using some criteria
 * @param props.style Style properties
 */
export const ItemList = ({ itemId, listId, style }: ItemListProps) => {
  const [rows, setRows] = useState<GridValidRowModel[]>([]);
  const [findListItems] = useFindListItemsLazyQuery({
    onCompleted(response) {
      setRows(response.findListItems);
    },
  });
  const [findSubItems] = useFindSubItemsLazyQuery({
    onCompleted(response) {
      setRows(response.findSubItems);
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

  useEffect(() => {
    if (itemId) {
      findSubItems({ variables: { input: { parentItemId: itemId } } });
    } else if (listId) {
      findListItems({ variables: { listId } });
    }
  }, [itemId, listId]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      hideFooter
      showBorder={style?.showBorder}
    />
  );
};

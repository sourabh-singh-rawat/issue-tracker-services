import React from "react";
import { useParams } from "react-router-dom";
import { useGetWorkspaceMembersQuery } from "../../../../api/generated/workspace.api";
import List from "../../../../common/components/List";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export default function WorkspaceMembers() {
  const { id } = useParams();
  const { data } = useGetWorkspaceMembersQuery({ id: id || "" });

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      headerName: "Name",
      field: "user",
      renderCell: ({ value }) => {
        return value?.displayName;
      },
      width: 400,
    },
    { headerName: "Role", field: "role" },
  ];

  return <List rows={data?.rows || []} columns={columns} />;
}

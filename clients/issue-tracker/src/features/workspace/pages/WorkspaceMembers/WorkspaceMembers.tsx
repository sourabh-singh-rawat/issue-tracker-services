import React from "react";
import { useParams } from "react-router-dom";
import { useGetWorkspaceMembersQuery } from "../../../../api/generated/workspace.api";
import List from "../../../../common/components/List";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import MemberModal from "../../components/MemberModal";

export default function WorkspaceMembers() {
  const { id } = useParams();
  const { data } = useGetWorkspaceMembersQuery({ id: id || "" });

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      headerName: "Name",
      field: "user",
      renderCell: ({ value, row }) => {
        return value?.displayName ? value.displayName : row.email;
      },
      width: 400,
    },
    { headerName: "Role", field: "role", width: 400 },
    { headerName: "Status", field: "status", width: 200 },
  ];

  return (
    <>
      <MemberModal />
      <List rows={data?.rows || []} columns={columns} />
    </>
  );
}

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { setMemberList } from "../../reducers/memberList.reducer";

const MemberList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rows } = useSelector((store) => store.memberList);

  useEffect(() => {
    const fetchProjectMembers = async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects/${id}/members`
      );

      const members = await response.json();
      dispatch(setMemberList(members));
    };
    fetchProjectMembers();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      minWidth: 300,
      flex: 0.3,
      renderCell: ({ value }) => {
        return (
          <>
            <Avatar sx={{ marginRight: "5px" }}>
              {value.match(/\b(\w)/g).slice(0, 2)}
            </Avatar>
            {value}
          </>
        );
      },
    },
    {
      field: "email",
      headerName: "EMAIL",
      minWidth: 300,
      flex: 0.3,
    },
    { field: "role", headerName: "ROLE", minWidth: 200, flex: 0.3 },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.user_id}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
      sx={{
        border: 0,
        fontSize: "inherit",
        color: "primary.text2",
        ".MuiDataGrid-cell": { color: "text.subtitle1", border: "none" },
        ".MuiDataGrid-columnHeaderTitle": {
          fontSize: "14px",
          fontWeight: "bold",
        },
        ".MuiDataGrid-columnHeaders": { borderBottom: "2px solid #DFE1E6" },
        ".MuiDataGrid-columnSeparator": { display: "none" },
        ".MuiDataGrid-footerContainer": { borderTop: "2px solid #DFE1E6" },
      }}
    />
  );
};

export default MemberList;

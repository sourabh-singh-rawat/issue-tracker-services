import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import Typography from "@mui/material/Typography";

import { setList } from "../../../teamList.slice";

import { useGetTeamsQuery } from "../../../../team/team.api";

const TeamList = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetTeamsQuery();
  const teams = useSelector((store) => store.teamList.rows);

  useEffect(() => {
    if (data) dispatch(setList({ rows: data.rows, rowCount: data.rowCount }));
  }, [isSuccess]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => (
        <Link
          to={`/teams/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              "&:hover": {
                color: "primary.main",
                textDecoration: "none!important",
              },
            }}
          >
            {params.row.name}
          </Typography>
        </Link>
      ),
    },
    {
      field: "members",
      headerName: "Members",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "creation_date",
      headerName: "Created At",
      width: 200,
      flex: 0.2,
      renderCell: ({ value }) => {
        return (
          <Typography variant="body2">
            {value ? format(parseISO(value), "eee, PP") : "-"}
          </Typography>
        );
      },
    },
  ];

  console.log(teams);

  return (
    <DataGrid
      rows={teams}
      columns={columns}
      sx={{
        border: 0,
        fontSize: "inherit",
        color: "primary.text2",
        ".MuiDataGrid-cell": {
          color: "text.primary",
          border: "none",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: "14px",
          fontWeight: 600,
        },
        ".MuiDataGrid-columnHeaders": {
          borderBottom: "2px solid #DFE1E6",
        },
        ".MuiDataGrid-columnSeparator": {
          display: "none",
        },
        ".MuiDataGrid-footerContainer": {
          borderTop: "2px solid #DFE1E6",
        },
      }}
      autoHeight
      disableSelectionOnClick
    />
  );
};

export default TeamList;

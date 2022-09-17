import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import Typography from "@mui/material/Typography";

import { setList } from "../../../team/team.slice";

import { useGetTeamsQuery } from "../../../team/team.api";

const TeamList = () => {
  const dispatch = useDispatch();
  const { data } = useGetTeamsQuery();
  const { rows } = useSelector((store) => store.team.list);

  useEffect(() => {
    if (data) dispatch(setList({ rows: data.rows, rowCount: data.rowCount }));
  }, [data]);

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => (
        <Link
          to={`/teams/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "text.subtitle1",
              fontWeight: "bold",
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
      field: "description",
      headerName: "DESCRIPTION",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "creation_date",
      headerName: "CREATED AT",
      width: 200,
      flex: 0.2,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "eee, PP") : "-",
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sx={{
        border: 0,
        fontSize: "inherit",
        color: "primary.text2",
        ".MuiDataGrid-cell": {
          color: "text.subtitle1",
          border: "none",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: "14px",
          fontWeight: "bold",
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

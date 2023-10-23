/* eslint-disable implicit-arrow-linebreak */
import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

import { setMembers } from "../../project.slice";
import List from "../../../../common/components/List";
import { useAppSelector } from "../../../../common/hooks";
import { useGetProjectMembersQuery } from "../../../../api/generated/project.api";
import dayjs from "dayjs";
import Avatar from "../../../../common/components/Avatar";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

function MemberList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rows, rowCount, pageSize } = useAppSelector(
    (store) => store.project.members,
  );
  const {
    data: projectMembers,
    isSuccess,
    isLoading,
  } = useGetProjectMembersQuery({ id });

  useEffect(() => {
    if (isSuccess) dispatch(setMembers(projectMembers));
  }, [projectMembers]);

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      flex: 0.3,
      field: "name",
      headerName: "Name",
      minWidth: 200,
      renderCell: ({ value, row: { photoUrl } }) => (
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`/profile/${id}`}
        >
          <Avatar label={value} photoUrl={photoUrl} />
          <MuiTypography
            sx={{
              pl: theme.spacing(1),
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
            variant="body2"
          >
            {value}
          </MuiTypography>
        </Link>
      ),
    },
    {
      flex: 0.3,
      field: "email",
      headerName: "Email",
      minWidth: 200,
      renderCell: ({ value }) => (
        <MuiTypography variant="body2" noWrap>
          {value}
        </MuiTypography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Creation Date",
      minWidth: 200,
      renderCell: ({ value }) => dayjs(value).fromNow(),
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 200,
    },
  ];

  return (
    <List
      columns={columns}
      rows={rows}
      rowCount={rowCount}
      isLoading={isLoading}
    />
  );
}

export default MemberList;

import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { format, formatISO, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";

import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";

import List from "../List";

import { setMembers } from "../../features/project/project.slice";
import { useGetProjectMembersQuery } from "../../features/project/project.api";

const MemberList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rows, rowCount, pageSize } = useSelector(
    (store) => store.project.members
  );
  const projectMembers = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (projectMembers.isSuccess) dispatch(setMembers(projectMembers.data));
  }, [projectMembers.data]);

  const columns = [
    {
      flex: 0.3,
      field: "name",
      headerName: "Name",
      minWidth: 200,
      renderCell: ({ id, value, row: { photo_url } }) => {
        return (
          <Fragment>
            <MuiAvatar
              src={photo_url}
              sx={{ width: "32px", height: "32px", marginRight: "10px" }}
            >
              {value.match(/\b(\w)/g)[0]}
            </MuiAvatar>
            <Link to={`/profile/${id}`} style={{ textDecoration: "none" }}>
              <MuiTypography
                variant="body2"
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none !important",
                  },
                }}
              >
                {value}
              </MuiTypography>
            </Link>
          </Fragment>
        );
      },
    },
    {
      flex: 0.3,
      field: "email",
      headerName: "Email",
      minWidth: 200,
      renderCell: ({ value }) => {
        return value[0].toUpperCase() + value.slice(1, value.length);
      },
    },
    {
      field: "created_at",
      headerName: "Creation Date",
      minWidth: 200,
      renderCell: ({ value }) => {
        return format(parseISO(value), "PP", { locale: enIN });
      },
    },
    { field: "project_member_role_name", headerName: "Role", minWidth: 200 },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      pageSize={pageSize}
      getRowId={(row) => row.member_id}
      isLoading={projectMembers.isLoading}
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
    />
  );
};

export default MemberList;

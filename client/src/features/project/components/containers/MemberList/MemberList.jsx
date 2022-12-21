import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { enIN } from "date-fns/locale";
import { format, parseISO } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";

import List from "../../../../../common/lists/List";

import { useGetProjectMembersQuery } from "../../../api/project.api";

import { setMembers } from "../../../slice/project.slice";

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
      renderCell: ({ id, value, row: { photoUrl } }) => {
        return (
          <MuiGrid
            container
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MuiGrid item>
              <MuiAvatar
                src={photoUrl}
                sx={{
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                }}
              >
                {value.match(/\b(\w)/g)[0]}
              </MuiAvatar>
            </MuiGrid>
            <MuiGrid item>
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
            </MuiGrid>
          </MuiGrid>
        );
      },
    },
    {
      flex: 0.3,
      field: "email",
      headerName: "Email",
      minWidth: 200,
      renderCell: ({ value }) => {
        return (
          <MuiTypography
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            variant="body2"
          >
            {value[0].toUpperCase() + value.slice(1, value.length)}
          </MuiTypography>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Creation Date",
      minWidth: 200,
      renderCell: ({ value }) => {
        return format(parseISO(value), "PP", { locale: enIN });
      },
    },
    { field: "projectMemberRoleName", headerName: "Role", minWidth: 200 },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      pageSize={pageSize}
      getRowId={(row) => row.memberId}
      isLoading={projectMembers.isLoading}
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
    />
  );
};

export default MemberList;

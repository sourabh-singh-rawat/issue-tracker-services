import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMembers } from "../../features/project/project.slice";
import { useGetProjectMembersQuery } from "../../features/project/project.api";
import MuiAvatar from "@mui/material/Avatar";
import List from "../List";
import MuiTypography from "@mui/material/Typography";

const MemberList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rows } = useSelector((store) => store.project.members);
  const projectMembers = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (projectMembers.data) dispatch(setMembers(projectMembers.data));
  }, [projectMembers.data]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 0.3,
      renderCell: ({ id, value }) => {
        return (
          <Fragment>
            <MuiAvatar
              sx={{ width: "35px", height: "35px", marginRight: "10px" }}
            >
              {value.match(/\b(\w)/g)[0]}
            </MuiAvatar>
            <Link to={`/profile/${id}`}>
              <MuiTypography
                variant="body2"
                sx={{ color: "text.subtitle1", fontWeight: 600 }}
              >
                {value}
              </MuiTypography>
            </Link>
          </Fragment>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 0.3,
    },
    { field: "role", headerName: "Role", minWidth: 200, flex: 0.3 },
  ];

  return (
    <List
      rows={rows}
      columns={columns}
      getRowId={(row) => row.user_id}
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
    />
  );
};

export default MemberList;

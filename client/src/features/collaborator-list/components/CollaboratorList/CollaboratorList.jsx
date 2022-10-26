import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";

import List from "../../../../common/List";

import {
  setCollaboratorList,
  updateCollaboratorList,
} from "../../collaborator-list.slice";

import { useGetCollaboratorsQuery } from "../../collaborator-list.api";

const CollaboratorList = () => {
  const dispatch = useDispatch();
  const { rows } = useSelector((store) => store.collaboratorList);
  const user = useSelector((store) => store.auth.user);
  const { page, pageSize, rowCount } = useSelector(
    (store) => store.collaboratorList
  );
  const getCollaboratorsQuery = useGetCollaboratorsQuery();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.45,
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
                    textDecoration: "none!important",
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
    { field: "email", headerName: "Email", flex: 0.3 },
  ];

  useEffect(() => {
    if (getCollaboratorsQuery.data)
      dispatch(setCollaboratorList(getCollaboratorsQuery.data));
  }, [getCollaboratorsQuery.isSuccess]);

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={getCollaboratorsQuery.isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) =>
        dispatch(updateCollaboratorList({ page: newPage }))
      }
      onPageSizeChange={(pageSize) =>
        dispatch(updateCollaboratorList({ pageSize }))
      }
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
      getRowId={(params) => params.user_id}
    />
  );
};

export default CollaboratorList;

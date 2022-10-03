import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "../../../../common/List";

import {
  setCollaboratorList,
  updateCollaboratorList,
} from "../../collaboratorList.slice";

import { useGetCollaboratorsQuery } from "../../collaboratorList.api";

const CollaboratorList = () => {
  const dispatch = useDispatch();
  const { rows } = useSelector((store) => store.collaboratorList);
  const user = useSelector((store) => store.auth.user);
  const { page, pageSize, rowCount } = useSelector(
    (store) => store.collaboratorList
  );
  const { data, isLoading } = useGetCollaboratorsQuery();
  const columns = [
    { field: "name", headerName: "Name", flex: 0.45 },
    { field: "email", headerName: "Email", flex: 0.3 },
  ];

  useEffect(() => {
    if (data) dispatch(setCollaboratorList(data));
  }, [isLoading]);

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={isLoading}
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

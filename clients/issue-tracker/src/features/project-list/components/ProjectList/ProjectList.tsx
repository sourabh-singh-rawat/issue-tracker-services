import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {
  GridColDef,
  GridPaginationModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { setProjectList } from "../../project-list.slice";
import List from "../../../../common/components/List";
import ProjectActionsButton from "../ProjectActionsButton";
import ProjectStatusSelector from "../ProjectStatusSelector";
import { useFindListsQuery } from "../../../../api/codegen/gql/graphql";

export default function ProjectList() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const { data, loading: isLoading } = useFindListsQuery();
  const { rows, rowCount } = useAppSelector((store) => store.projectList);

  useEffect(() => {
    if (data) dispatch(setProjectList(data.findLists));
  }, [data]);

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/lists/${params.row.id}/overview`}
        >
          <MuiTypography
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
              ":hover": {
                color: theme.palette.primary.main,
              },
            }}
            noWrap
          >
            {params.row.name}
          </MuiTypography>
        </Link>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      type: "string",
      minWidth: 150,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            variant="body2"
          >
            {dayjs().to(dayjs(value))}
          </MuiTypography>
        ) : (
          "-"
        ),
    },

    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ value }) => <ProjectActionsButton options={value} />,
    },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      isLoading={isLoading}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
    />
  );
}

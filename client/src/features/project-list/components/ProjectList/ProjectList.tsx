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

import { SelectChangeEvent, useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

import {
  useGetProjectListQuery,
  useUpdateProjectMutation,
} from "../../../../api/generated/project.api";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { setProjectList } from "../../project-list.slice";
import List from "../../../../common/components/List";
import ProjectActionsButton from "../ProjectActionsButton";
import BaseSelector from "../../../../common/components/Select";

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

  const { data, isSuccess, isLoading } = useGetProjectListQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sortBy: "updatedAt",
    sortOrder: "desc",
  });
  const { rows, rowCount } = useAppSelector((store) => store.projectList);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProjectList(data));
    }
  }, [data]);

  function SelectEditInputCell({ id, value, field, row }) {
    const [updateProject, { isSuccess }] = useUpdateProjectMutation();

    const handleChange = async (e: SelectChangeEvent<unknown>) => {
      await updateProject({
        id,
        body: { status: e.target.value },
      });
    };

    return (
      <BaseSelector
        name="status"
        onChange={handleChange}
        value={value}
        options={row.statuses}
      />
    );
  }

  const renderSelectEditInputCell = (params) => (
    <SelectEditInputCell {...params} />
  );

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/projects/${params.row.id}/overview`}
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
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.1,
      renderCell: (params) => renderSelectEditInputCell(params),
    },
    {
      field: "members",
      headerName: "Members",
      minWidth: 50,
      renderCell: ({ value }) => {
        return (
          <MuiTypography variant="body2" width="100%" textAlign="right">
            {value?.length}
          </MuiTypography>
        );
      },
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
      field: "action",
      headerName: "Actions",
      renderCell: ({ id }) => <ProjectActionsButton id={id} />,
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

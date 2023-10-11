import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

import { useGetProjectListQuery } from "../../../../api/generated/project.api";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { setProjectList } from "../../project-list.slice";
import BaseSelector from "../../../project/components/BaseSelector";
import List from "../../../../common/components/List";

const enLocale = dayjs.locale("en-in");
dayjs.extend(relativeTime);

function ProjectList() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams({ page: "0", pageSize: "10" });
  const [page, setPage] = useState(searchParams.get("page"));
  const [pageSize, setPageSize] = useState(searchParams.get("pageSize"));

  const { data, isSuccess, isLoading } = useGetProjectListQuery({
    page,
    pageSize,
    sortBy: "updatedAt",
    sortOrder: "desc",
  });
  const { rows, rowCount } = useAppSelector((store) => store.projectList);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProjectList(data));
    }
  }, [page, pageSize, data, isLoading]);

  function SelectEditInputCell({ id, value, field, row }) {
    // const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();

    const handleChange = async (event) => {
      apiRef.current.startCellEditMode({ id, field });
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      // await updateProjectMutation({
      //   id,
      //   body: { [field]: event.target.value },
      // });
    };

    useEffect(() => {
      // if (isSuccess) dispatch(setMessageBarOpen(true));
    }, [isSuccess]);

    return <BaseSelector value={value} options={row.statuses} />;
  }

  const renderSelectEditInputCell = (params) => (
    <SelectEditInputCell {...params} />
  );

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 0.45,
      renderCell: (params) => (
        <Link
          style={{ textDecoration: "none" }}
          to={`/projects/${params.row.id}/overview`}
        >
          <MuiTypography
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            variant="body2"
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
      editable: true,
      flex: 0.1,
      renderCell: (params) => renderSelectEditInputCell(params),
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      type: "date",
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
          "never"
        ),
    },

    // {
    //   field: "action",
    //   headerName: "Actions",
    //   renderCell: ({ id }) => <ProjectActionsButton id={id} />,
    // },
  ];

  console.log(isLoading);

  return (
    <List
      columns={columns}
      getRowId={({ id }) => id}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      rows={rows}
      rowCount={rowCount}
      onPageChange={(page: string) => {
        setPage(page);
        searchParams.set("page", page);
      }}
      onPageSizeChange={(pageSize: string) => {
        setPageSize(pageSize);
        searchParams.set("pageSize", pageSize);
      }}
    />
  );
}

export default ProjectList;

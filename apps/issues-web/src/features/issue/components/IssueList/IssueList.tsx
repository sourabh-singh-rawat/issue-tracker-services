import { ArchiveOutlined, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { useFindProjectIssuesQuery, useFindSubIssuesQuery } from "@generated/gql";
import { DataGrid, Link } from "@shared";

interface IssueListProps {
  issueId?: string;
  projectId?: string;
  filters?: IssueListFilters;
  style?: IssueListStyles;
}

interface IssueListFilters {}

interface IssueListStyles {
  showBorder?: boolean;
}

/**
 * Shows issues in a project or sub-issues under an issue
 */
export const IssueList = ({ issueId, projectId, style }: IssueListProps) => {
  const projectIssues = useFindProjectIssuesQuery(
    { projectId: projectId! },
    {
      select: (data) => data.findProjectIssues,
      enabled: Boolean(projectId) && !issueId,
    },
  );
  const subIssues = useFindSubIssuesQuery(
    { input: { parentIssueId: issueId! } },
    {
      select: (data) => data.findSubIssues,
      enabled: Boolean(issueId),
    },
  );
  const rows: GridValidRowModel[] = issueId ? (subIssues.data ?? []) : (projectIssues.data ?? []);

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      type: "text",
      renderCell({ id, value }: GridRenderCellParams) {
        return <Link to={`/i/${id}`}>{value}</Link>;
      },
    },
    { field: "dueDate", headerName: "Due Date" },
    { field: "priority", headerName: "Priority" },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      type: "actions",
      getActions() {
        return [
          <GridActionsCellItem
            label="Rename"
            icon={<EditOutlined fontSize="small" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Archive"
            icon={<ArchiveOutlined fontSize="small" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Delete"
            icon={<DeleteOutlineOutlined fontSize="small" />}
            showInMenu
          />,
        ];
      },
    },
  ];

  return <DataGrid rows={rows} columns={columns} hideFooter showBorder={style?.showBorder} />;
};

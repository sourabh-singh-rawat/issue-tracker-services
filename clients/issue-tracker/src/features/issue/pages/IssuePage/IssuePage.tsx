import { Grid2, Stack, Typography, useTheme } from "@mui/material";
import {
  useFindIssueQuery,
  useUpdateIssueMutation,
} from "@generated/gql";
import type { UpdateIssueInput } from "@generated/gql/graphql";
import { useIssueParams, useSnackbar } from "@common";
import {
  IssueAttachments,
  IssueDescription,
  IssueFields,
  IssueList,
  IssueModal,
  IssueName,
} from "../../components";

export const IssuePage = () => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const { issueId } = useIssueParams();
  const { data: issue } = useFindIssueQuery(
    { findIssueId: issueId! },
    {
      select: (data) => data.findIssue ?? null,
      enabled: Boolean(issueId),
    },
  );
  const { mutateAsync: updateIssueMutation } = useUpdateIssueMutation();

  const updateIssue = async (input: UpdateIssueInput) => {
    try {
      const response = await updateIssueMutation({ input });
      snackbar.success(response.updateIssue);
      return response;
    } catch (error) {
      snackbar.error(
        error instanceof Error ? error.message : "Failed to update issue",
      );
      throw error;
    }
  };

  return (
    <Grid2 container rowGap={4} sx={{ px: theme.spacing(4) }}>
      <Grid2 size={12}>
        <IssueName issueId={issueId} initialValue={issue?.name} />
      </Grid2>
      {issue && issueId && (
        <Grid2 size={12}>
          <IssueFields
            issueId={issueId}
            projectId={issue.project.id}
            statusId={issue.statusId}
            priority={issue.priority}
            updateIssue={updateIssue}
          />
        </Grid2>
      )}

      <Grid2 size={12}>
        <IssueDescription
          issueId={issueId}
          initialValue={issue?.description}
        />
      </Grid2>

      <Grid2 size={12}>
        <Typography variant="body1" fontWeight="600">
          Custom Fields
        </Typography>
      </Grid2>

      {issue?.project.id && issue && (
        <Grid2 size={12}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" fontWeight="600">
                Sub Issues
              </Typography>
              <IssueModal projectId={issue.project.id} />
            </Stack>
            <IssueList issueId={issue.id} style={{ showBorder: true }} />
          </Stack>
        </Grid2>
      )}

      <Grid2 size={12}>
        <Typography variant="body1" fontWeight="600">
          Checklists
        </Typography>
      </Grid2>

      {issueId && (
        <Grid2 size={12}>
          <Typography variant="body1" fontWeight="600">
            Attachments
          </Typography>

          <IssueAttachments issueId={issueId} />
        </Grid2>
      )}
    </Grid2>
  );
};

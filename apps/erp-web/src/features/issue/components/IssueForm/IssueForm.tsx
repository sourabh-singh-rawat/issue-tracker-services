import { Grid2 } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import type { CreateIssueInput } from "@generated/gql/graphql";
import { useCreateIssueMutation } from "@generated/gql";
import { DatePicker, PrimaryButton, TextField, useSnackbar } from "@shared";
import { IssuePrioritySelector } from "../IssuePrioritySelector";
import { IssueStatusSelector } from "../IssueStatusSelector";

interface IssueFormProps {
  projectId: string;
  parentIssueId?: string;
}

export const IssueForm = ({ projectId, parentIssueId }: IssueFormProps) => {
  const messageBar = useSnackbar();
  const { mutateAsync: createIssue } = useCreateIssueMutation();

  const form = useForm<CreateIssueInput>({
    defaultValues: {
      projectId,
      parentIssueId,
      description: "",
      statusId: "",
      priority: "",
      dueDate: null,
      assigneeIds: [],
      estimate: undefined,
      component: "",
    },
    mode: "all",
  });
  const onSubmit: SubmitHandler<CreateIssueInput> = async ({
    name,
    description,
    projectId: formProjectId,
    parentIssueId: formParentIssueId,
    assigneeIds,
    priority,
    statusId,
    dueDate,
    estimate,
    component,
  }) => {
    try {
      await createIssue({
        input: {
          parentIssueId: formParentIssueId,
          projectId: formProjectId,
          name,
          description,
          type: "issue",
          assigneeIds,
          statusId,
          priority,
          dueDate: dueDate ? dayjs(dueDate).format() : null,
          estimate: estimate ? Number(estimate) : null,
          component: component || null,
        },
      });
      messageBar.success("Issue created successfully");
    } catch (error) {
      messageBar.error(error instanceof Error ? error.message : "Failed to create issue");
    }
  };

  return (
    <MuiContainer component="form" onSubmit={form.handleSubmit(onSubmit)} disableGutters>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField form={form} name="name" label="Name" placeholder="Name" />
        </Grid2>

        <Grid2 size={12}>
          <TextField
            form={form}
            name="description"
            label="Description"
            placeholder="Description"
            rows={4}
          />
        </Grid2>

        <Grid2 size={6}>
          <IssueStatusSelector form={form} name="statusId" title="Status" projectId={projectId} />
        </Grid2>

        <Grid2 size={6}>
          <IssuePrioritySelector
            form={form}
            name="priority"
            title="Priority"
            options={["Urgent", "High", "Medium", "Low"]}
          />
        </Grid2>
        <Grid2 size={6}>
          <DatePicker name="dueDate" title="Due Date" form={form} />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            form={form}
            name="estimate"
            label="Estimate"
            placeholder="Estimate (hours/points)"
            type="number"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField form={form} name="component" label="Component" placeholder="Component name" />
        </Grid2>
        <Grid2 size={6}>
          <PrimaryButton label="Create Issue" type="submit" />
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
};

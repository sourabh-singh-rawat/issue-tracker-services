/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";

// import DatePicker from "../../../../common/DatePicker";
// import SectionHeader from "../../../../common/SectionHeader";
// import TextField from "../../../../common/TextField";

// import IssueAssigneeSelector from "../../../../common/IssueAssigneeSelector";
// import IssuePrioritySelector from "../../components/IssuePrioritySelector";
// import IssueStatusSelector from "../../components/IssueStatusSelector";
// import PrimaryButton from "../../../../common/PrimaryButton";

// import Label from "../../../../common/Label";

// import { setMembers } from "../../../project/project.slice";
// import {
//   setIssuePriority,
//   setIssueStatus,
//   updateIssue,
// } from "../../issue.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import TextField from "../../../../common/components/forms/TextField";
import DatePicker from "../../../../common/components/DatePicker";
import { useGetProjectMembersQuery } from "../../../../api/generated/project.api";
import openapi from "../../../../api/generated/openapi.json";
import {
  useCreateIssueMutation,
  useGetIssuePriorityListQuery,
  useGetIssueStatusListQuery,
} from "../../../../api/generated/issue.api";
import FormAutocomplete from "../../../../common/components/FormAutocomplete";
import IssueStatusSelector from "../../components/IssueStatusSelector";
import IssuePrioritySelector from "../../components/IssuePrioritySelector";
import TextButton from "../../../../common/components/buttons/TextButton";
import { useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IssueFormProps {
  projectId?: string;
}

function IssueForm({ projectId }: IssueFormProps) {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: members, isSuccess } = useGetProjectMembersQuery({ id });
  const [createIssue] = useCreateIssueMutation();
  const { data: statusList } = useGetIssueStatusListQuery();
  const { data: priorityList } = useGetIssuePriorityListQuery();

  const defaultValues = useMemo(
    () => ({
      projectId: id,
      name: "",
      description: "",
      dueDate: "",
      status: "Not Started",
      assignees: [],
      reporter: undefined,
      priority: "",
      resolution: false,
    }),
    [],
  );
  const defaultSchemas: any = useMemo(
    () =>
      openapi.paths["/issues"].post.requestBody.content["application/json"]
        .schema,
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver(defaultSchemas, {
      formats: { date: AjvFormats.get("date") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    name,
    description,
    dueDate,
    status,
    projectId,
    assignees,
    priority,
    reporter,
    resolution,
  }) => {
    createIssue({
      body: {
        name,
        description,
        dueDate,
        priority,
        projectId,
        reporter,
        assignees,
        status,
        resolution,
      },
    });
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid container spacing={2}>
        <MuiGrid xs={12} item sx={{ marginLeft: theme.spacing(-0.5) }}>
          <TextButton
            label="Back to all issues"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/issues")}
          />
        </MuiGrid>

        <MuiGrid sm={12} xs={12} item>
          <TextField
            name="name"
            title="Name"
            control={control}
            formState={formState}
          />
        </MuiGrid>

        <MuiGrid sm={12} xs={12} item>
          <TextField
            name="description"
            title="Description"
            control={control}
            formState={formState}
            rows={4}
          />
        </MuiGrid>

        <MuiGrid sm={6} xs={6} item>
          <IssueStatusSelector
            name="status"
            title="Status"
            control={control}
            formState={formState}
            options={statusList?.rows}
          />
        </MuiGrid>

        <MuiGrid sm={6} xs={6} item>
          <IssuePrioritySelector
            name="priority"
            title="Priority"
            control={control}
            formState={formState}
            options={priorityList?.rows}
          />
        </MuiGrid>

        {projectId ? null : (
          <MuiGrid sm={6} xs={6} item>
            <FormAutocomplete
              name="projectId"
              title="Project"
              fixedOptions={[]}
              control={control}
              formState={formState}
            />
          </MuiGrid>
        )}

        <MuiGrid sm={12} xs={12} item>
          <FormAutocomplete
            name="assignees"
            title="Assignees"
            control={control}
            formState={formState}
            options={members?.rows}
            isMultiple
          />
        </MuiGrid>

        <MuiGrid sm={6} xs={6} item>
          <FormAutocomplete
            name="reporter"
            title="Reported By"
            options={members?.rows}
            control={control}
            formState={formState}
          />
        </MuiGrid>

        {/* <MuiGrid sm={12} xs={12} item>
              <IssueAssigneeSelector
                handleChange={(e) => {
                  const { value } = e.target;

                  setFormFields({
                    ...formFields,
                    assigneeId: value,
                  });
                  dispatch(updateIssue({ assigneeId: value }));
                }}
                isLoading={members.isLoading}
                projectMembers={members.rows}
                title="Assignee"
                value={formFields.assigneeId}
              />
            </MuiGrid> */}

        {/* <MuiGrid sm={12} xs={12} item>
          <IssuePrioritySelector
            handleChange={handleChange}
            title="Priority"
            value={formFields.priority}
          />
        </MuiGrid> */}
        <MuiGrid sm={6} xs={12} item>
          <DatePicker
            name="dueDate"
            title="Due Date"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid sm={6} xs={12} item>
          {/* <IssueStatusSelector
                handleChange={handleChange}
                title="Status"
                value={formFields.status}
              /> */}
        </MuiGrid>
        <MuiGrid xs={12} item>
          <PrimaryButton label="Create Issue" type="submit" />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default IssueForm;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import TextField from "../../../../common/components/forms/TextField";
import DatePicker from "../../../../common/components/DatePicker";
import FormAutocomplete from "../../../../common/components/FormAutocomplete";
import IssueStatusSelector from "../../components/ItemStatusSelector";
import IssuePrioritySelector from "../../components/ItemPrioritySelector";
import {
  CreateItemInput,
  useCreateItemMutation,
} from "../../../../api/codegen/gql/graphql";
import { useMessageBar } from "../../../message-bar/hooks";
import dayjs from "dayjs";

interface ItemFormProps {
  listId: string;
  parentItemId?: string;
}

function ItemForm({ listId, parentItemId }: ItemFormProps) {
  const navigate = useNavigate();
  const messageBar = useMessageBar();
  const [createItem] = useCreateItemMutation({
    onCompleted(response) {
      messageBar.showSuccess("Item created successfully");

      if (parentItemId) return;
      setTimeout(
        () => navigate(`/lists/${listId}/items/${response.createItem}`),
        2000,
      );
    },
    onError(error) {
      messageBar.showError(error.message);
    },
  });

  const { control, formState, handleSubmit } = useForm<CreateItemInput>({
    defaultValues: {
      listId,
      name: "",
      type: "temp",
      status: "To Do",
      priority: "Low",
      description: "",
      dueDate: null,
      assigneeIds: [],
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateItemInput> = async ({
    name,
    description,
    status,
    listId,
    type,
    assigneeIds,
    priority,
    dueDate,
  }) => {
    console.log(parentItemId);
    await createItem({
      variables: {
        input: {
          parentItemId,
          listId,
          name,
          description,
          type,
          priority,
          assigneeIds,
          status,
          dueDate: dueDate ? dayjs(dueDate).format() : null,
        },
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
            options={["BACKLOG"]}
          />
        </MuiGrid>

        <MuiGrid sm={6} xs={6} item>
          <IssuePrioritySelector
            name="priority"
            title="Priority"
            control={control}
            formState={formState}
            options={["Low"]}
          />
        </MuiGrid>

        {/* <MuiGrid sm={12} xs={12} item>
          <FormAutocomplete
            name="assigneeIds"
            title="Assignees"
            control={control}
            formState={formState}
            options={members?.rows.map(({ user: { id, displayName } }) => ({
              id,
              name: displayName,
            }))}
            isMultiple
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
        <MuiGrid sm={6} xs={12} item></MuiGrid>
        <MuiGrid xs={12} item>
          <PrimaryButton label="Create Issue" type="submit" />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default ItemForm;

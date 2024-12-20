import { Grid2 } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import dayjs from "dayjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateItemInput,
  ListCustomField,
  useCreateItemMutation,
  useFindCustomFieldsQuery,
} from "../../../../api/codegen/gql/graphql";
import DatePicker from "../../../../common/components/DatePicker";
import { useSnackbar } from "../../../../common/components/Snackbar";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import TextField from "../../../../common/components/forms/TextField";
import IssuePrioritySelector from "../../components/ItemPrioritySelector";
import IssueStatusSelector from "../../components/ItemStatusSelector";

interface ItemFormProps {
  listId: string;
  parentItemId?: string;
}

function ItemForm({ listId, parentItemId }: ItemFormProps) {
  const messageBar = useSnackbar();
  const [itemFields, setItemFields] = useState<ListCustomField[]>([]);
  const [createItem] = useCreateItemMutation({
    onCompleted() {
      messageBar.success("Item created successfully");
    },
    onError(error) {
      messageBar.error(error.message);
    },
  });
  useFindCustomFieldsQuery({
    variables: { options: { listId } },
    onCompleted(response) {
      setItemFields(response.findCustomFields);
    },
  });

  const { control, formState, handleSubmit } = useForm<CreateItemInput>({
    defaultValues: {
      listId,
      name: "",
      description: "",
      statusId: "",
      priority: "",
      dueDate: null,
      assigneeIds: [],
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateItemInput> = async ({
    name,
    description,
    listId,
    type,
    assigneeIds,
    priority,
    statusId,
    dueDate,
    parentItemId,
    ...fields
  }) => {
    await createItem({
      variables: {
        input: {
          parentItemId,
          listId,
          name,
          description,
          type: "issue",
          assigneeIds,
          statusId,
          priority,
          dueDate: dueDate ? dayjs(dueDate).format() : null,
          fields,
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
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField
            name="name"
            title="Name"
            control={control}
            formState={formState}
          />
        </Grid2>

        <Grid2 size={12}>
          <TextField
            name="description"
            title="Description"
            control={control}
            formState={formState}
            rows={4}
          />
        </Grid2>

        <Grid2 size={6}>
          <IssueStatusSelector
            name="statusId"
            title="Status"
            control={control}
            formState={formState}
          />
        </Grid2>

        <Grid2 size={6}>
          <IssuePrioritySelector
            name="priority"
            title="Priority"
            control={control}
            formState={formState}
            options={["Urgent", "High", "Medium", "Low"]}
          />
        </Grid2>

        {/* <Grid2 size={12} >
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
        </Grid2> */}

        <Grid2 size={6}>
          <DatePicker
            name="dueDate"
            title="Due Date"
            control={control}
            formState={formState}
          />
        </Grid2>
        <Grid2 size={6}></Grid2>
        <Grid2 size={6}>
          <PrimaryButton label="Create Issue" type="submit" />
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
}

export default ItemForm;

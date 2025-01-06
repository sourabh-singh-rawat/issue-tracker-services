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
import { TextField } from "../../../../common/components/forms";
import { ItemPrioritySelector } from "../ItemPrioritySelector";
import { ItemStatusSelector } from "../ItemStatusSelector";

interface ItemFormProps {
  listId: string;
  parentItemId?: string;
}

export const ItemForm = ({ listId, parentItemId }: ItemFormProps) => {
  const messageBar = useSnackbar();
  const [customFields, setCustomFields] = useState<ListCustomField[]>([]);
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
      setCustomFields(response.findCustomFields);
    },
  });

  const form = useForm<CreateItemInput>({
    defaultValues: {
      listId,
      parentItemId,
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
    parentItemId,
    type,
    assigneeIds,
    priority,
    statusId,
    dueDate,
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
      onSubmit={form.handleSubmit(onSubmit)}
      disableGutters
    >
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
          <ItemStatusSelector form={form} name="statusId" title="Status" />
        </Grid2>

        <Grid2 size={6}>
          <ItemPrioritySelector
            form={form}
            name="priority"
            title="Priority"
            options={["Urgent", "High", "Medium", "Low"]}
          />
        </Grid2>
        <Grid2 size={6}>
          <DatePicker name="dueDate" title="Due Date" form={form} />
        </Grid2>
        <Grid2 size={6}></Grid2>
        <Grid2 size={6}>
          <PrimaryButton label="Create Item" type="submit" />
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
};

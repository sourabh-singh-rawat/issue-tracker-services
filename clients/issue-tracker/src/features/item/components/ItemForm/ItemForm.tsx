import { Grid2 } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import type { CreateItemInput } from "@generated/gql/graphql";
import {
  useCreateItemMutation,
  useFindCustomFieldsQuery,
} from "@generated/gql";
import { DatePicker, PrimaryButton, TextField, useSnackbar } from "@common";
import { ItemPrioritySelector } from "../ItemPrioritySelector";
import { ItemStatusSelector } from "../ItemStatusSelector";

interface ItemFormProps {
  listId: string;
  parentItemId?: string;
}

export const ItemForm = ({ listId, parentItemId }: ItemFormProps) => {
  const messageBar = useSnackbar();
  const { mutateAsync: createItem } = useCreateItemMutation();
  useFindCustomFieldsQuery(
    { options: { listId } },
    { enabled: Boolean(listId) },
  );

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
    listId: formListId,
    parentItemId: formParentItemId,
    assigneeIds,
    priority,
    statusId,
    dueDate,
    ...fields
  }) => {
    try {
      await createItem({
        input: {
          parentItemId: formParentItemId,
          listId: formListId,
          name,
          description,
          type: "issue",
          assigneeIds,
          statusId,
          priority,
          dueDate: dueDate ? dayjs(dueDate).format() : null,
          fields,
        },
      });
      messageBar.success("Item created successfully");
    } catch (error) {
      messageBar.error(
        error instanceof Error ? error.message : "Failed to create item",
      );
    }
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
          <ItemStatusSelector
            form={form}
            name="statusId"
            title="Status"
            listId={listId}
          />
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

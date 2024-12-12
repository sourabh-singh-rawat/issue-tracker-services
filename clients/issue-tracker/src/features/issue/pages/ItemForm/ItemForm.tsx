import { Grid2 } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import dayjs from "dayjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateItemInput,
  FieldOutput,
  useCreateItemMutation,
  useFindFieldsQuery,
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
  const [itemFields, setItemFields] = useState<FieldOutput[]>([]);
  const messageBar = useSnackbar();
  const [createItem] = useCreateItemMutation({
    onCompleted(response) {
      messageBar.showSuccess("Item created successfully");
    },
    onError(error) {
      messageBar.showError(error.message);
    },
  });
  useFindFieldsQuery({
    variables: { options: { listId } },
    onCompleted(response) {
      setItemFields(response.findFields);
    },
  });

  const { control, formState, handleSubmit } = useForm<
    Record<string, string | string[]>
  >({
    defaultValues: {
      listId,
      name: "",
      description: "",
      dueDate: null,
      assigneeIds: [],
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateItemInput> = async (
    {
      name,
      description,
      listId,
      type,
      assigneeIds,
      dueDate,
      parentItemId,
      ...fields
    },
  ) => {
    await createItem({
      variables: {
        input: {
          parentItemId,
          listId,
          name,
          description,
          type: "issue",
          assigneeIds,
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

        {itemFields.map(({ id, name, type }) => {
          switch (type) {
            case "_Status":
              return (
                <Grid2 size={6} key={id}>
                  <IssueStatusSelector
                    name={id}
                    title={name}
                    control={control}
                    formState={formState}
                  />
                </Grid2>
              );

            case "_Priority":
              return (
                <Grid2 size={6} key={id}>
                  <IssuePrioritySelector
                    name={id}
                    title={name}
                    control={control}
                    formState={formState}
                    options={["Low"]}
                  />
                </Grid2>
              );
          }
          return "Invalid Type";
        })}

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

import { Grid2, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { UpdateItemMutationOptions } from "../../../../api";
import { ItemPrioritySelector } from "../ItemPrioritySelector";
import { ItemStatusSelector } from "../ItemStatusSelector";

interface ItemFieldsProps {
  itemId: string;
  listId: string;
  statusId: string;
  priority: string;
  updateItem: (options: UpdateItemMutationOptions) => Promise<any>;
}

export default function ItemFields({
  itemId,
  listId,
  statusId,
  priority,
  updateItem,
}: ItemFieldsProps) {
  const statusForm = useForm({ defaultValues: { statusId } });
  const priorityForm = useForm({ defaultValues: { priority } });

  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={12}>
        <Grid2 container>
          <Grid2 size={3}>
            <Typography variant="body1">Status</Typography>
          </Grid2>
          <Grid2 size={3}>
            <ItemStatusSelector
              form={statusForm}
              listId={listId}
              name="statusId"
              onSubmit={async (value) => {
                updateItem({
                  variables: { input: { itemId, statusId: value } },
                });
              }}
            />
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={12}>
        <Grid2 container>
          <Grid2 size={3}>
            <Typography variant="body1">Priority</Typography>
          </Grid2>
          <Grid2 size={3}>
            <ItemPrioritySelector
              form={priorityForm}
              name="priority"
              onSubmit={async (value) => {
                updateItem({
                  variables: { input: { itemId, priority: value } },
                });
              }}
              options={["Urgent", "High", "Normal", "Low"]}
            />
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={12}>
        <Grid2 container>
          <Grid2 size={3}>
            <Typography variant="body1">Dates</Typography>
          </Grid2>
          <Grid2 size={3}>Empty</Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

import { Grid2, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { UpdateItemMutationOptions } from "../../../api/codegen/gql/graphql";
import {
  ItemPrioritySelector,
  ItemStatusSelector,
} from "../../../features/item/components";

interface ItemFieldsProps {
  itemId: string;
  statusId: string;
  priority: string;
  updateItem: (options: UpdateItemMutationOptions) => Promise<any>;
}

export default function ItemFields({
  itemId,
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
            <Typography variant="h6">Status</Typography>
          </Grid2>
          <Grid2 size={3}>
            <ItemStatusSelector
              form={statusForm}
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
            <Typography variant="h6">Priority</Typography>
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
            <Typography variant="h6">Dates</Typography>
          </Grid2>
          <Grid2 size={3}>Empty</Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

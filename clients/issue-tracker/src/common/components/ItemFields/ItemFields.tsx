import React, { useContext } from "react";
import { Grid2, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ItemStatusSelector from "../../../features/issue/components/ItemStatusSelector";
import ItemPrioritySelector from "../../../features/issue/components/ItemPrioritySelector";
import { UpdateItemMutationOptions } from "../../../api/codegen/gql/graphql";

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
  const itemStatusForm = useForm({ defaultValues: { statusId } });
  const itemPriorityForm = useForm({ defaultValues: { priority } });

  return (
    <Grid2 container rowSpacing={2}>
      <Grid2 size={12}>
        <Grid2 container>
          <Grid2 size={3}>
            <Typography variant="h6">Status</Typography>
          </Grid2>
          <Grid2 size={3}>
            <ItemStatusSelector
              control={itemStatusForm.control}
              formState={itemStatusForm.formState}
              name="statusId"
              onSubmit={async (value) => {
                updateItem({ variables: { input: { itemId, status: value } } });
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
              control={itemPriorityForm.control}
              formState={itemPriorityForm.formState}
              name="priority"
              onSubmit={async (value) => {
                updateItem({ variables: { input: { itemId, status: value } } });
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

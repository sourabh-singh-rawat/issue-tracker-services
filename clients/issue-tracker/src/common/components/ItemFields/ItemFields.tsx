import React, { useContext } from "react";
import { Grid2, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ItemStatusSelector from "../../../features/issue/components/ItemStatusSelector";
import ItemPrioritySelector from "../../../features/issue/components/ItemPrioritySelector";
import { UpdateItemMutationOptions } from "../../../api/codegen/gql/graphql";
import { SpaceContext } from "../../Contexts";

interface ItemFieldsProps {
  itemId: string;
  status: string;
  priority: string;
  updateItem: (options: UpdateItemMutationOptions) => Promise<any>;
}

export default function ItemFields({
  itemId,
  status,
  priority,
  updateItem,
}: ItemFieldsProps) {
  const itemStatusForm = useForm({ defaultValues: { status } });
  const itemPriorityForm = useForm({ defaultValues: { priority } });
  const context = useContext(SpaceContext);

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
              name="status"
              onSubmit={async (value) => {
                updateItem({ variables: { input: { itemId, status: value } } });
              }}
              options={context?.statuses.map(({ name }) => name)}
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

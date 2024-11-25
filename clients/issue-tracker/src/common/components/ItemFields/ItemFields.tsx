import React from "react";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import ItemStatusSelector from "../../../features/issue/components/ItemStatusSelector";
import { useForm } from "react-hook-form";
import ItemPrioritySelector from "../../../features/issue/components/ItemPrioritySelector";
import { UpdateItemMutationOptions } from "../../../api/codegen/gql/graphql";

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

  return (
    <MuiGrid container rowSpacing={2}>
      <MuiGrid item xs={12}>
        <MuiGrid container xs={12}>
          <MuiGrid item xs={3}>
            <MuiTypography variant="h6">Status</MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={3}>
            <ItemStatusSelector
              control={itemStatusForm.control}
              formState={itemStatusForm.formState}
              name="status"
              onSubmit={async (value) => {
                updateItem({ variables: { input: { itemId, status: value } } });
              }}
              options={["BACKLOG", "ON HOLD", "DEVELOPMENT"]}
            />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <MuiGrid container>
          <MuiGrid item xs={3}>
            <MuiTypography variant="h6">Priority</MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={3}>
            <ItemPrioritySelector
              control={itemPriorityForm.control}
              formState={itemPriorityForm.formState}
              name="priority"
              onSubmit={async (value) => {
                updateItem({ variables: { input: { itemId, status: value } } });
              }}
              options={["Urgent", "High", "Normal", "Low"]}
            />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
}

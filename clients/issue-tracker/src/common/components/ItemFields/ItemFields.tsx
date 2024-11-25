import React from "react";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import ItemStatusSelector from "../../../features/issue/components/ItemStatusSelector";
import { useForm } from "react-hook-form";
import ItemPrioritySelector from "../../../features/issue/components/ItemPrioritySelector";

interface ItemFieldsProps {
  status: string;
}

export default function ItemFields({ status }: ItemFieldsProps) {
  const itemStatusForm = useForm({ defaultValues: { status } });
  const itemPriorityForm = useForm();

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
              options={["Urgent", "High", "Normal", "Low"]}
            />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
}

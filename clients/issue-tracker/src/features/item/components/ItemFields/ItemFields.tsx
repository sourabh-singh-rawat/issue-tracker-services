import {
  CalendarMonthOutlined,
  CircleOutlined,
  FlagOutlined,
} from "@mui/icons-material";
import { Grid2, Stack, Typography, useTheme } from "@mui/material";
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

export const ItemFields = ({
  itemId,
  listId,
  statusId,
  priority,
  updateItem,
}: ItemFieldsProps) => {
  const theme = useTheme();
  const statusForm = useForm({ defaultValues: { statusId } });
  const priorityForm = useForm({ defaultValues: { priority } });

  const rows = [
    {
      icon: <CircleOutlined fontSize="small" />,
      name: "Status",
      component: (
        <ItemStatusSelector
          form={statusForm}
          listId={listId}
          name="statusId"
          onSubmit={async (value) => {
            updateItem({ variables: { input: { itemId, statusId: value } } });
          }}
        />
      ),
    },
    {
      icon: <FlagOutlined fontSize="small" />,
      name: "Priority",
      component: (
        <ItemPrioritySelector
          form={priorityForm}
          name="priority"
          onSubmit={async (value) => {
            updateItem({ variables: { input: { itemId, priority: value } } });
          }}
          options={["Urgent", "High", "Normal", "Low"]}
        />
      ),
    },
    {
      icon: <CalendarMonthOutlined fontSize="small" />,
      name: "Dates",
      component: <Typography>Empty</Typography>,
    },
  ];

  return (
    <Grid2 container columnSpacing={4} rowSpacing={2}>
      {rows.map(({ icon, name, component }, index) => {
        return (
          <Grid2 size={{ xs: 12, md: 6 }} key={index}>
            <Grid2 container>
              <Grid2
                flexGrow={1}
                sx={{
                  alignItems: "center",
                  alignContent: "center",
                  color: theme.palette.text.secondary,
                }}
              >
                <Stack direction="row" spacing={theme.spacing(0.5)}>
                  <div>{icon}</div>
                  <Typography variant="body1">{name}</Typography>
                </Stack>
              </Grid2>
              <Grid2 size={8}>{component}</Grid2>
            </Grid2>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

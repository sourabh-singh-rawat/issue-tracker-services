import { Grid2, Stack, Typography, useTheme } from "@mui/material";
import {
  useFindItemQuery,
  useUpdateItemMutation,
} from "@generated/gql";
import type { UpdateItemInput } from "@generated/gql/graphql";
import { useItemParams, useSnackbar } from "@common";
import {
  ItemAttachments,
  ItemDescription,
  ItemFields,
  ItemList,
  ItemModal,
  ItemName,
} from "../../components";

export const ItemPage = () => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const { itemId } = useItemParams();
  const { data: item } = useFindItemQuery(
    { findItemId: itemId! },
    {
      select: (data) => data.findItem ?? null,
      enabled: Boolean(itemId),
    },
  );
  const { mutateAsync: updateItemMutation } = useUpdateItemMutation();

  const updateItem = async (input: UpdateItemInput) => {
    try {
      const response = await updateItemMutation({ input });
      snackbar.success(response.updateItem);
      return response;
    } catch (error) {
      snackbar.error(
        error instanceof Error ? error.message : "Failed to update item",
      );
      throw error;
    }
  };

  return (
    <Grid2 container rowGap={4} sx={{ px: theme.spacing(4) }}>
      <Grid2 size={12}>
        <ItemName itemId={itemId} initialValue={item?.name} />
      </Grid2>
      {item && itemId && (
        <Grid2 size={12}>
          <ItemFields
            itemId={itemId}
            listId={item.list.id}
            statusId={item.statusId}
            priority={item.priority}
            updateItem={updateItem}
          />
        </Grid2>
      )}

      <Grid2 size={12}>
        <ItemDescription itemId={itemId} initialValue={item?.description} />
      </Grid2>

      <Grid2 size={12}>
        <Typography variant="body1" fontWeight="600">
          Custom Fields
        </Typography>
      </Grid2>

      {item?.list.id && item && (
        <Grid2 size={12}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" fontWeight="600">
                Sub Items
              </Typography>
              <ItemModal listId={item.list.id} />
            </Stack>
            <ItemList itemId={item.id} style={{ showBorder: true }} />
          </Stack>
        </Grid2>
      )}

      <Grid2 size={12}>
        <Typography variant="body1" fontWeight="600">
          Checklists
        </Typography>
      </Grid2>

      {itemId && (
        <Grid2 size={12}>
          <Typography variant="body1" fontWeight="600">
            Attachments
          </Typography>

          <ItemAttachments itemId={itemId} />
        </Grid2>
      )}
    </Grid2>
  );
};

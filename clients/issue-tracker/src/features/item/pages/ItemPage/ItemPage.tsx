import { Grid2, Stack, Typography, useTheme } from "@mui/material";
import { useFindItemQuery, useUpdateItemMutation } from "../../../../api";
import { useItemParams } from "../../../../common";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import { ItemAttachments } from "../../components/ItemAttachments";
import { ItemDescription } from "../../components/ItemDescription";
import ItemFields from "../../components/ItemFields";
import { ItemList } from "../../components/ItemList";
import { ItemModal } from "../../components/ItemModal";
import { ItemName } from "../../components/ItemName";

export const ItemPage = () => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const { itemId } = useItemParams();
  const { data: item } = useFindItemQuery({
    variables: { findItemId: itemId },
    skip: !itemId,
  });
  const [updateItem] = useUpdateItemMutation({
    onCompleted(response) {
      snackbar.success(response.updateItem);
    },
    onError(error) {
      snackbar.error(error.message);
    },
  });

  return (
    <Grid2 container rowGap={4} sx={{ px: theme.spacing(4) }}>
      <Grid2 size={12}>
        <ItemName itemId={itemId} initialValue={item?.findItem?.name} />
      </Grid2>
      {item?.findItem && itemId && (
        <Grid2 size={12}>
          <ItemFields
            itemId={itemId}
            listId={item.findItem.list.id}
            statusId={item.findItem.statusId}
            priority={item.findItem.priority}
            updateItem={updateItem}
          />
        </Grid2>
      )}

      <Grid2 size={12}>
        <ItemDescription
          itemId={itemId}
          initialValue={item?.findItem?.description}
        />
      </Grid2>

      <Grid2 size={12}>
        <Typography variant="body1" fontWeight="600">
          Custom Fields
        </Typography>
      </Grid2>

      {item?.findItem?.list.id && item?.findItem && (
        <Grid2 size={12}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" fontWeight="600">
                Sub Items
              </Typography>
              <ItemModal listId={item?.findItem.list.id} />
            </Stack>
            <ItemList itemId={item.findItem.id} style={{ showBorder: true }} />
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

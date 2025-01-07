import { Stack, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import MuiTypography from "@mui/material/Typography";
import { useFindItemQuery, useUpdateItemMutation } from "../../../../api";
import { useItemParams } from "../../../../common";
import { ItemDescription, ItemName } from "../../../../common/components";
import ItemFields from "../../../../common/components/ItemFields";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import { ItemAttachments } from "../ItemAttachments";
import { ItemList } from "../ItemList";
import { ItemModal } from "../ItemModal";

export interface ItemProps {}

export default function Item(props: ItemProps) {
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
        <MuiTypography variant="body1" fontWeight="600">
          Custom Fields
        </MuiTypography>
      </Grid2>

      {item?.findItem?.list.id && item?.findItem && (
        <Grid2 size={12}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MuiTypography variant="body1" fontWeight="600">
                Sub Items
              </MuiTypography>
              <ItemModal listId={item?.findItem.list.id} />
            </Stack>
            <ItemList itemId={item.findItem.id} style={{ showBorder: true }} />
          </Stack>
        </Grid2>
      )}

      <Grid2 size={12}>
        <MuiTypography variant="body1" fontWeight="600">
          Checklists
        </MuiTypography>
      </Grid2>

      {itemId && (
        <Grid2 size={12}>
          <MuiTypography variant="body1" fontWeight="600">
            Attachments
          </MuiTypography>

          <ItemAttachments itemId={itemId} />
        </Grid2>
      )}
    </Grid2>
  );
}

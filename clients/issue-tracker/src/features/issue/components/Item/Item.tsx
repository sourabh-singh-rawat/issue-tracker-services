import { useTheme } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import MuiTypography from "@mui/material/Typography";
import {
  useFindItemQuery,
  useFindSubItemsQuery,
  useUpdateItemMutation,
} from "../../../../api";
import { useAppParams } from "../../../../common";
import ItemDescription from "../../../../common/components/ItemDescription";
import ItemFields from "../../../../common/components/ItemFields";
import ItemName from "../../../../common/components/ItemName";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import ItemAttachments from "../../../issue-attachments/pages/ItemAttachments";
import ItemModal from "../ItemModal";

export interface ItemProps {}

export default function Item(props: ItemProps) {
  const theme = useTheme();
  const messageBar = useSnackbar();
  const { listId, itemId } = useAppParams();
  const { data: item } = useFindItemQuery({
    variables: { findItemId: itemId as string },
    skip: !itemId,
  });
  const { data: subItems } = useFindSubItemsQuery({
    variables: {
      input: { listId: listId as string, parentItemId: itemId as string },
    },
  });
  const [updateItem] = useUpdateItemMutation({
    onCompleted(response) {
      messageBar.success(response.updateItem);
    },
    onError(error) {
      messageBar.error(error.message);
    },
  });

  return (
    <Grid2 container rowGap={4} sx={{ px: theme.spacing(4) }}>
      <Grid2 size={12}>
        <ItemName
          handleSubmit={async (name) => {
            if (!itemId) return;
            await updateItem({ variables: { input: { itemId, name } } });
          }}
          defaultValue={item?.findItem?.name}
        />
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
          handleSubmit={async (description) => {
            if (!itemId) return;
            await updateItem({ variables: { input: { itemId, description } } });
          }}
          defaultValue={item?.findItem?.description}
        />
      </Grid2>

      <Grid2 size={12}>
        <MuiTypography variant="h5" fontWeight="600">
          Custom Fields
        </MuiTypography>
      </Grid2>

      {listId && item?.findItem && (
        <>
          <Grid2>
            <MuiTypography variant="h5" fontWeight="600">
              Sub Items
            </MuiTypography>
          </Grid2>
          <Grid2>
            <ItemModal />
          </Grid2>

          <Grid2 size={12}>
            <Grid2 container>
              {subItems?.findSubItems?.map(({ name }) => {
                return <Grid2 size={12}>{name}</Grid2>;
              })}
            </Grid2>
          </Grid2>
        </>
      )}

      <Grid2 size={12}>
        <MuiTypography variant="h5" fontWeight="600">
          Checklists
        </MuiTypography>
      </Grid2>

      {itemId && (
        <Grid2 size={12}>
          <MuiTypography variant="h5" fontWeight="600">
            Attachments
          </MuiTypography>

          <ItemAttachments itemId={itemId} />
        </Grid2>
      )}
    </Grid2>
  );
}

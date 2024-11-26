import React from "react";
import { useParams } from "react-router-dom";
import {
  useFindItemQuery,
  useUpdateItemMutation,
} from "../../../../api/codegen/gql/graphql";
import { useMessageBar } from "../../../message-bar/hooks";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import ItemName from "../../../../common/components/ItemName";
import ItemDescription from "../../../../common/components/ItemDescription";
import ItemFields from "../../../../common/components/ItemFields";
import ItemModal from "../ItemModal";

export interface ItemProps {}

export default function Item(props: ItemProps) {
  const messageBar = useMessageBar();
  const { id, itemId } = useParams<{ id: string; itemId: string }>();
  const { data: item } = useFindItemQuery({
    variables: { findItemId: itemId as string },
    skip: !itemId,
  });
  const [updateItem] = useUpdateItemMutation({
    onCompleted(response) {
      messageBar.showSuccess(response.updateItem);
    },
    onError(error) {
      messageBar.showError(error.message);
    },
  });

  return (
    <MuiGrid container rowGap={2}>
      <MuiGrid item xs={12}>
        <ItemName
          handleSubmit={async (name) => {
            if (!itemId) return;
            await updateItem({ variables: { input: { itemId, name } } });
          }}
          defaultValue={item?.findItem?.name}
        />
      </MuiGrid>
      {item?.findItem && itemId && (
        <MuiGrid item xs={12}>
          <ItemFields
            itemId={itemId}
            status={item.findItem.status}
            priority={item.findItem.priority}
            updateItem={updateItem}
          />
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        <ItemDescription
          handleSubmit={async (description) => {
            if (!itemId) return;
            await updateItem({ variables: { input: { itemId, description } } });
          }}
          defaultValue={item?.findItem?.description}
        />
      </MuiGrid>
      {id && item?.findItem && (
        <MuiGrid item xs={12}>
          <MuiTypography variant="h4">Sub Items</MuiTypography>
          <ItemModal listId={id} parentItemId={itemId} />

          <MuiGrid container>
            {item?.findItem?.subItems?.map(({ name }) => {
              return (
                <MuiGrid item xs={12}>
                  {name}
                </MuiGrid>
              );
            })}
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

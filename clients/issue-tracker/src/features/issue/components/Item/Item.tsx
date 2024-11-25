import React from "react";
import { useParams } from "react-router-dom";
import {
  useFindItemQuery,
  useUpdateItemMutation,
} from "../../../../api/codegen/gql/graphql";
import ItemName from "../../../../common/components/ItemName";
import ItemDescription from "../../../../common/components/ItemDescription";
import { useMessageBar } from "../../../message-bar/hooks";
import ItemFields from "../../../../common/components/ItemFields";
import MuiGrid from "@mui/material/Grid";

export interface ItemProps {}

export default function Item(props: ItemProps) {
  const messageBar = useMessageBar();
  const { itemId } = useParams<{ itemId: string }>();
  const { data: item } = useFindItemQuery({
    variables: { id: itemId as string },
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
      <MuiGrid item xs={12}>
        {item?.findItem?.status && <ItemFields status={item.findItem.status} />}
      </MuiGrid>
      <MuiGrid item xs={12}>
        <ItemDescription
          handleSubmit={async (description) => {
            if (!itemId) return;
            await updateItem({ variables: { input: { itemId, description } } });
          }}
          defaultValue={item?.findItem?.description}
        />
      </MuiGrid>
    </MuiGrid>
  );
}

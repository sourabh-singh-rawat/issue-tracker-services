import React from "react";
import { useParams } from "react-router-dom";
import {
  useFindItemQuery,
  useUpdateItemMutation,
} from "../../../../api/codegen/gql/graphql";
import ItemTitle from "../../../../common/components/ItemName";
import ItemDescription from "../../../../common/components/ItemDescription";
import { useMessageBar } from "../../../message-bar/hooks";

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
    <>
      <ItemTitle
        handleSubmit={async (name) => {
          if (!itemId) return;
          await updateItem({ variables: { input: { itemId, name } } });
        }}
        defaultValue={item?.findItem?.name}
      />
      <ItemDescription
        handleSubmit={async (description) => {
          if (!itemId) return;
          await updateItem({ variables: { input: { itemId, description } } });
        }}
        defaultValue={item?.findItem?.description}
      />
    </>
  );
}

import React from "react";
import { useParams } from "react-router-dom";
import {
  useFindItemQuery,
  useUpdateItemMutation,
} from "../../../../api/codegen/gql/graphql";
import ItemTitle from "../../../../common/components/ItemTitle";

export interface ItemProps {}

export default function Item(props: ItemProps) {
  const { itemId } = useParams<{ itemId: string }>();

  const { data: item } = useFindItemQuery({
    variables: { id: itemId as string },
    skip: !itemId,
  });
  const [updateItem] = useUpdateItemMutation();

  return (
    <ItemTitle
      handleSubmit={async (name) => {
        if (!itemId) return;
        await updateItem({ variables: { input: { itemId, name } } });
      }}
      defaultValue={item?.findItem?.name}
    />
  );
}

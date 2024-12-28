import { Grid2 } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useFindListItemsQuery } from "../../../api";

export const ListView = () => {
  const { listId } = useOutletContext();

  const { data } = useFindListItemsQuery({
    variables: { listId },
    skip: !listId,
    onCompleted(response) {
      console.log(response.findListItems);
    },
  });

  return (
    <Grid2 container rowSpacing={2}>
      {data?.findListItems.map(({ name }, index) => {
        return (
          <Grid2 key={index} size={12}>
            {name}
          </Grid2>
        );
      })}
    </Grid2>
  );
};

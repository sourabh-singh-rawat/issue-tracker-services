import { useOutletContext } from "react-router-dom";
import { useAppParams } from "../../../common";

export const ListView = () => {
  const { viewId } = useAppParams();
  const { items, statuses } = useOutletContext();

  return items?.map(({ name }) => name);
};

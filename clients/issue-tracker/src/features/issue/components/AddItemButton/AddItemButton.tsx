import { useState } from "react";
import IssueModal from "../ItemModal";

interface AddItemButtonProps {
  listId: string;
}

export function AddItemButton({ listId }: AddItemButtonProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IssueModal listId={listId} />
    </>
  );
}

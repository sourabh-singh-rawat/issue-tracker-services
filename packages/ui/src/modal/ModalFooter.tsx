import Stack from "@mui/material/Stack";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";

export interface ModalFooterProps {
  handleClose: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export function ModalFooter({
  handleClose,
  submitLabel = "Create",
  cancelLabel = "Cancel",
}: ModalFooterProps) {
  return (
    <Stack direction="row-reverse" spacing={1} sx={{ mt: 2 }}>
      <PrimaryButton type="submit" label={submitLabel} />
      <SecondaryButton label={cancelLabel} onClick={handleClose} />
    </Stack>
  );
}

export default ModalFooter;

import MuiCircularProgress from "@mui/material/CircularProgress";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

interface UploadButtonProps {
  label: string | React.ReactElement;
  onClick: (e: unknown) => void;
  open: boolean;
}

export const UploadButton = ({ label, onClick, open }: UploadButtonProps) => {
  return (
    <PrimaryButton
      label={label}
      endIcon={
        open && <MuiCircularProgress size={20} sx={{ color: "common.white" }} />
      }
      onClick={onClick}
    />
  );
};

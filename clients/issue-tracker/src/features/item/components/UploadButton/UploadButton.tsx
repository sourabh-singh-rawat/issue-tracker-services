import MuiCircularProgress from "@mui/material/CircularProgress";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

interface UploadButtonProps {
  label: string | React.ReactElement;
  onClick: (e: unknown) => void;
  isLoading?: boolean;
}

export const UploadButton = ({
  label,
  onClick,
  isLoading,
}: UploadButtonProps) => {
  return (
    <PrimaryButton
      label={label}
      size="small"
      endIcon={
        isLoading && (
          <MuiCircularProgress size={20} sx={{ color: "common.white" }} />
        )
      }
      onClick={onClick}
    />
  );
};

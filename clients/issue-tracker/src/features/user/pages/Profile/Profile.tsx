import { useTheme } from "@mui/material";
import Avatar from "../../../../common/components/Avatar";

export default function Profile() {
  const theme = useTheme();

  return (
    <div>
      <Avatar label="s" width={theme.spacing(8)} height={theme.spacing(8)} />
    </div>
  );
}

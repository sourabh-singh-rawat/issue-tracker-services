import MuiChip from "@mui/material/Chip";

export default function Chip({ id }) {
  return <MuiChip label={id} size="small" sx={{ borderRadius: "4px" }} />;
}

import MuiChip from "@mui/material/Chip";

const Chip = ({ id }) => {
  return <MuiChip label={id} size="small" sx={{ borderRadius: "4px" }} />;
};

export default Chip;

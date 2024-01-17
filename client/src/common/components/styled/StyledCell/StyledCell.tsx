import MuiTableCell from "@mui/material/TableCell";
import { styled } from "@mui/system";

const StyledCell = styled(MuiTableCell)(({ theme }) => ({
  "&.MuiTableCell-root": {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
  },
}));

export default StyledCell;

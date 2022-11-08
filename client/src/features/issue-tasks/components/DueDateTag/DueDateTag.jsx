import { formatRelative, parseISO } from "date-fns";
import { enIN } from "date-fns/locale";

import { useTheme } from "@mui/material/styles";
import MuiChip from "@mui/material/Chip";

const formatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: "dd.MM.yyyy",
};

const locale = {
  ...enIN,
  formatRelative: (token) => formatRelativeLocale[token],
};

const DueDateTag = ({ dueDate }) => {
  const theme = useTheme();

  return (
    <MuiChip
      size="small"
      component="span"
      label={formatRelative(parseISO(dueDate), new Date(), {
        locale,
      })}
      sx={{
        borderRadius: "4px",
        fontWeight: 500,
        color: theme.palette.grey[600],
      }}
    />
  );
};

export default DueDateTag;

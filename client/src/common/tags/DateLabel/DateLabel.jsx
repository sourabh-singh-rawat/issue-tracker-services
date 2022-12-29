/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { formatRelative, parseISO } from 'date-fns';
import { enIN } from 'date-fns/locale';

import { useTheme } from '@mui/material/styles';
import MuiChip from '@mui/material/Chip';

const formatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: 'dd.MM.yyyy',
};

const locale = {
  ...enIN,
  formatRelative: (token) => formatRelativeLocale[token],
};

function DueDateTag({ dueDate }) {
  const theme = useTheme();

  return (
    dueDate && (
      <MuiChip
        component="span"
        label={formatRelative(parseISO(dueDate), new Date(), {
          locale,
        })}
        size="small"
        sx={{
          borderRadius: '4px',
          fontWeight: 500,
          color: theme.palette.grey[600],
        }}
      />
    )
  );
}

export default DueDateTag;

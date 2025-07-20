import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material";
import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiChip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import { Label } from "../forms";
import StyledTextField from "../styled/StyledTextField";

interface AutocompleteProps {
  title: string;
  value: unknown;
  onChange: () => void;
  options?: { name: string; id: string }[];
  fixedOptions?: { name: string; id: string }[];
  isDisabled?: boolean;
  isClearable?: boolean;
  isMultiple?: boolean;
  isError?: boolean;
}

export default function Autocomplete({
  title,
  value,
  onChange,
  options = [],
  fixedOptions = [],
  isDisabled = false,
  isClearable = true,
  isMultiple = false,
  isError = false,
}: AutocompleteProps) {
  const theme = useTheme();

  return (
    <>
      {title && (
        <Grid item xs={12} paddingBottom={1}>
          <Label id={title} title={title} />
        </Grid>
      )}
      <MuiAutocomplete
        value={value}
        onChange={(event, newValue) => {
          if (Array.isArray(newValue)) {
            return onChange(_.uniqBy([...fixedOptions, ...newValue], "id"));
          }
          onChange(newValue);
        }}
        popupIcon={<KeyboardArrowDownIcon />}
        options={options}
        getOptionLabel={(o) => o.name}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <MuiChip
              size="small"
              label={option.name}
              {...getTagProps({ index })}
              disabled={!!fixedOptions.find((o) => o.id === option.id)}
              sx={{ borderRadius: theme.shape.borderRadiusMedium }}
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <StyledTextField {...params} size="small" error={isError} />
        )}
        limitTags={1}
        disableClearable={isClearable}
        disabled={isDisabled}
        multiple={isMultiple}
      />
    </>
  );
}

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material";
import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiChip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import { Label } from "../forms";
import StyledTextField from "../styled/StyledTextField";

export type AutocompleteOption = { name: string; id: string };

interface AutocompleteProps {
  title: string;
  value: AutocompleteOption | AutocompleteOption[] | null;
  onChange: (value: AutocompleteOption | AutocompleteOption[] | null) => void;
  options?: AutocompleteOption[];
  fixedOptions?: AutocompleteOption[];
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
        onChange={(_event, newValue) => {
          if (Array.isArray(newValue)) {
            return onChange(
              _.uniqBy([...fixedOptions, ...(newValue as AutocompleteOption[])], "id"),
            );
          }
          onChange(newValue as AutocompleteOption | null);
        }}
        popupIcon={<KeyboardArrowDownIcon />}
        options={options}
        getOptionLabel={(o) => (o as AutocompleteOption).name}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const opt = option as AutocompleteOption;
            return (
              <MuiChip
                size="small"
                label={opt.name}
                {...getTagProps({ index })}
                disabled={!!fixedOptions.find((o) => o.id === opt.id)}
                sx={{ borderRadius: theme.shape.borderRadiusMedium }}
                key={index}
              />
            );
          })
        }
        renderInput={(params) => <StyledTextField {...params} size="small" error={isError} />}
        limitTags={1}
        disableClearable={isClearable}
        disabled={isDisabled}
        multiple={isMultiple}
      />
    </>
  );
}

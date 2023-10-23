import React from "react";
import MuiChip from "@mui/material/Chip";
import MuiAutocomplete from "@mui/material/Autocomplete";
import _ from "lodash";
import StyledTextField from "../styled/StyledTextField";

import MuiGrid from "@mui/material/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Label from "../forms/Label";
import { useTheme } from "@mui/material";

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
        <MuiGrid item xs={12} paddingBottom={1}>
          <Label id={title} title={title} />
        </MuiGrid>
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

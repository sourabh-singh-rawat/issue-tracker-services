/* eslint-disable react/prop-types */
import React from "react";

import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";
import Label from "../../../../common/components/forms/Label";
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Select from "../../../../common/components/Select";

interface IssueStatusSelectorProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
  title?: string;
  options?: string[];
  helperText?: string;
  rules?: UseControllerProps<DefaultValues>["rules"];
}

export default function IssueStatusSelector<DefaultValues extends FieldValues>({
  name,
  control,
  rules,
  title,
  options = [],
  helperText,
}: IssueStatusSelectorProps<DefaultValues>) {
  const isLoading = false;

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12} paddingBottom={1}>
          <Label id={title} title={title} isLoading={isLoading} />
        </MuiGrid>
      )}
      <MuiFormControl fullWidth>
        {isLoading ? (
          <MuiSkeleton />
        ) : (
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
              return (
                <Select
                  name={field.name}
                  value={field.value}
                  options={options}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              );
            }}
          />
        )}
      </MuiFormControl>
      {isLoading ? (
        <MuiSkeleton width="200px" />
      ) : (
        helperText && (
          <MuiFormHelperText>
            <MuiTypography component="span" sx={{ fontSize: "13px" }}>
              {helperText}
            </MuiTypography>
          </MuiFormHelperText>
        )
      )}
    </MuiGrid>
  );
}

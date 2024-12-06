/* eslint-disable react/prop-types */
import React from "react";

import {
  FormControl,
  FormHelperText,
  Grid2,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
  UseControllerProps,
} from "react-hook-form";
import Select from "../../../../common/components/Select";
import Label from "../../../../common/components/forms/Label";

interface ItemPrioritySelectorProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
  onSubmit?: (value: string) => void;
  title?: string;
  options?: string[];
  helperText?: string;
  rules?: UseControllerProps<DefaultValues>["rules"];
}

export default function ItemPrioritySelector<
  DefaultValues extends FieldValues,
>({
  name,
  control,
  rules,
  onSubmit,
  title,
  options = [],
  helperText,
}: ItemPrioritySelectorProps<DefaultValues>) {
  const isLoading = false;

  return (
    <Grid2 container>
      {title && (
        <Grid2 size={12} paddingBottom={1}>
          <Label id={title} title={title} isLoading={isLoading} />
        </Grid2>
      )}
      <FormControl fullWidth>
        {isLoading ? (
          <Skeleton />
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
                  options={options.map((option) => ({
                    id: option,
                    name: option,
                  }))}
                  onChange={(e) => {
                    if (!e.target.value) return;

                    if (onSubmit) onSubmit(e.target.value as string);
                    field.onChange(e.target.value);
                  }}
                />
              );
            }}
          />
        )}
      </FormControl>
      {isLoading ? (
        <Skeleton width="200px" />
      ) : (
        helperText && (
          <FormHelperText>
            <Typography component="span" sx={{ fontSize: "13px" }}>
              {helperText}
            </Typography>
          </FormHelperText>
        )
      )}
    </Grid2>
  );
}

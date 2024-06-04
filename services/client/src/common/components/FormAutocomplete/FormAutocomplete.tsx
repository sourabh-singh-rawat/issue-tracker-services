import React from "react";
import Autocomplete from "../Autocomplete";
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
} from "react-hook-form";

interface ControlledAutocompleteProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
  title: string;
  options?: { name: string; id: string }[];
  fixedOptions?: { name: string; id: string }[];
  isDisabled?: boolean;
  isClearable?: boolean;
  isMultiple?: boolean;
}

export default function FormAutocomplete<DefaultValues extends FieldValues>({
  name,
  options = [],
  fixedOptions = [],
  title,
  control,
  formState,
  isDisabled = false,
  isClearable = true,
  isMultiple = false,
}: ControlledAutocompleteProps<DefaultValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            title={title}
            value={field.value}
            options={options}
            onChange={field.onChange}
            fixedOptions={fixedOptions}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isMultiple={isMultiple}
            isError={Boolean(formState.errors[name])}
          />
        );
      }}
    />
  );
}

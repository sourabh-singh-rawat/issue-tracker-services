import { useContext } from "react";

import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";
import Grid2 from "@mui/material/Grid2";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
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
import { SpaceContext } from "../../../../common/contexts";

interface ItemStatusSelectorProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
  onSubmit?: (value: string) => void;
  title?: string;
  helperText?: string;
  rules?: UseControllerProps<DefaultValues>["rules"];
}

export default function ItemStatusSelector<DefaultValues extends FieldValues>(
  {
    name,
    control,
    rules,
    onSubmit,
    title,
    helperText,
  }: ItemStatusSelectorProps<DefaultValues>,
) {
  const isLoading = false;
  const context = useContext(SpaceContext);

  return (
    <Grid2 container>
      {title && (
        <Grid2 size={12} paddingBottom={1}>
          <Label id={title} title={title} isLoading={isLoading} />
        </Grid2>
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
                  options={context.statuses || []}
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
    </Grid2>
  );
}

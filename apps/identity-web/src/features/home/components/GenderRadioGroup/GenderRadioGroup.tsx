import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useFormField } from "@shared/ui";

const GENDER_OPTIONS: { value: "MALE" | "FEMALE" | "UNSPECIFIED"; label: string }[] = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "UNSPECIFIED", label: "Rather not say" },
];

export const GenderRadioGroup = () => {
  const field = useFormField<string>();

  return (
    <FormControl error={Boolean(field.error)} disabled={field.disabled} fullWidth>
      <RadioGroup
        name={field.name}
        value={field.value}
        onChange={(event) => {
          field.onChange(event.target.value);
        }}
        onBlur={field.onBlur}
      >
        {GENDER_OPTIONS.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { TextInput, type TextInputProps } from "../TextInput/TextInput";

export type PasswordInputProps = Omit<TextInputProps, "type">;

export const PasswordInput = ({ slotProps, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextInput
      type={visible ? "text" : "password"}
      autoComplete={props.autoComplete ?? "current-password"}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={visible ? "Hide password" : "Show password"}
                edge="end"
                size="small"
                onClick={() => setVisible((prev) => !prev)}
                onMouseDown={(event) => event.preventDefault()}
              >
                {visible ? "Hide" : "Show"}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

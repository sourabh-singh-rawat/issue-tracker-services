import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Grid2";
import { alpha, styled, useTheme } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const TitleTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    overflow: "hidden",
    paddingTop: theme.spacing(0.35),
    paddingBottom: theme.spacing(0.35),
    textOverflow: "ellipsis",
    borderRadius: theme.shape.borderRadiusMedium,
    paddingLeft: theme.spacing(1),
  },
  "& .MuiOutlinedInput-root": {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
    backgroundColor: "transparent",
    borderRadius: theme.shape.borderRadiusMedium,
    "& fieldset": { border: "2px solid transparent" },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      "& fieldset": { border: `2px solid ${theme.palette.grey[200]}` },
    },
    "&.Mui-focused": {
      "& fieldset": { borderColor: theme.palette.primary.main },
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

interface TitleProps {
  defaultValue?: string;
  handleSubmit: (value: string) => void;
}

export default function Name({ defaultValue = "", handleSubmit }: TitleProps) {
  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);
  const [previousValue, setPreviousValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const textValue = e.target.value;
    setValue(textValue);
  };

  const handleClick = () => {
    setPreviousValue(value);
    setIsFocused(true);
  };

  const handleCancel = () => {
    setIsFocused(false);
    setValue(defaultValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Grid2 container sx={{ mt: theme.spacing(1), ml: theme.spacing(-2) }}>
      <Grid2 flexGrow={1}>
        <TitleTextField
          name="name"
          value={value}
          onClick={handleClick}
          onChange={handleChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          type="text"
          fullWidth
        />
      </Grid2>

      <Grid2 sx={{ display: isFocused ? "flex" : "none" }}>
        <MuiIconButton
          onClick={() => {
            if (value !== previousValue) handleSubmit(value);
            setIsFocused(false);
          }}
        >
          <DoneIcon />
        </MuiIconButton>
      </Grid2>
      <Grid2 sx={{ display: isFocused ? "flex" : "none" }}>
        <MuiIconButton onClick={handleCancel}>
          <CloseIcon />
        </MuiIconButton>
      </Grid2>
    </Grid2>
  );
}

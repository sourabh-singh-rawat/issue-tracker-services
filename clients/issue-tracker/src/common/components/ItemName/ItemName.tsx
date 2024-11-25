import React, { useEffect, useState } from "react";
import MuiGrid from "@mui/material/Grid";
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
    fontSize: theme.typography.h1.fontSize,
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

interface ItemTitleProps {
  defaultValue?: string;
  handleSubmit: (value: string) => void;
}

export default function ItemName({
  defaultValue = "",
  handleSubmit,
}: ItemTitleProps) {
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
    <MuiGrid columnSpacing={1} sx={{ marginLeft: theme.spacing(-2) }} container>
      <MuiGrid flexGrow={1} item>
        <TitleTextField
          name="name"
          value={value}
          fullWidth
          onClick={handleClick}
          onChange={handleChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          type="text"
        />
      </MuiGrid>

      <MuiGrid item sx={{ display: isFocused ? "flex" : "none" }}>
        <MuiIconButton
          onClick={() => {
            if (value !== previousValue) handleSubmit(value);
            setIsFocused(false);
          }}
        >
          <DoneIcon />
        </MuiIconButton>
      </MuiGrid>
      <MuiGrid item sx={{ display: isFocused ? "flex" : "none" }}>
        <MuiIconButton onClick={handleCancel}>
          <CloseIcon />
        </MuiIconButton>
      </MuiGrid>
    </MuiGrid>
  );
}

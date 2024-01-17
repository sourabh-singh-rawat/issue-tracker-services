import React, { useState } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiTextField from "@mui/material/TextField";
import { alpha, styled, useTheme } from "@mui/material/styles";

import TextButton from "../buttons/TextButton";
import PrimaryButton from "../buttons/PrimaryButton";

const TitleTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    overflow: "hidden",
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    textOverflow: "ellipsis",
    borderRadius: theme.shape.borderRadiusMedium,
    paddingLeft: theme.spacing(1),
  },
  "& .MuiOutlinedInput-root": {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
    backgroundColor: "transparent",
    borderRadius: theme.shape.borderRadiusMedium,
    "& fieldset": {
      border: "2px solid transparent",
    },
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

interface TitleProps<T extends { name: string }> {
  page: T;
  setPage: React.Dispatch<React.SetStateAction<T>>;
  updateQuery: () => Promise<void>;
}

export default function Title<T extends { name: string }>({
  page,
  setPage,
  updateQuery,
}: TitleProps<T>) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [previousName, setPreviousName] = useState("");

  const handleSubmit = async () => {
    if (page?.name !== previousName) await updateQuery();
    setIsFocused(false);
  };

  const handleClick = () => {
    setIsFocused(true);
    setPreviousName(page.name);
  };

  const handleCancel = () => {
    setIsFocused(false);
    setPage({ ...page, name: previousName });
  };

  return (
    <MuiGrid columnSpacing={1} sx={{ marginLeft: theme.spacing(-2) }} container>
      <MuiGrid flexGrow={1} item>
        <TitleTextField
          name="name"
          value={page?.name}
          fullWidth
          onClick={handleClick}
          onChange={(e) => setPage({ ...page, name: e.target.value })}
        />
      </MuiGrid>
      <MuiGrid item sx={{ display: isFocused ? "flex" : "none" }}>
        <PrimaryButton label="Save" onClick={handleSubmit} />
      </MuiGrid>
      <MuiGrid item sx={{ display: isFocused ? "flex" : "none" }}>
        <TextButton label="Cancel" onClick={handleCancel} />
      </MuiGrid>
    </MuiGrid>
  );
}

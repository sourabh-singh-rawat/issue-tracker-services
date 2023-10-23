import React from "react";
import { useDispatch } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import { alpha, styled, useTheme } from "@mui/material/styles";

import CancelButton from "../CancelButton";
import PrimaryButton from "../buttons/PrimaryButton";
import MuiTextField from "@mui/material/TextField";
import { useAppDispatch } from "../../hooks";

const TitleTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    overflow: "hidden",
    paddingTop: "2px",
    paddingBottom: "2px",
    textOverflow: "ellipsis",
    borderRadius: theme.shape.borderRadiusMedium,
  },
  "& .MuiOutlinedInput-root ": {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
    backgroundColor: "transparent",
    "& fieldset": {
      border: "2px solid transparent",
      borderRadius: theme.shape.borderRadiusMedium,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      "& fieldset": {
        border: `2px solid ${theme.palette.grey[200]}`,
      },
    },
    "&.Mui-focused": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
    borderRadius: theme.shape.borderRadiusMedium,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

interface TitleProps<T extends { nameSelected: boolean }> {
  page: T;
  updateTitle: () => void;
  updateTitleQuery: () => void;
}

export default function Title<T>({
  page,
  updateTitle,
  updateTitleQuery,
}: TitleProps<T>) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { nameSelected } = page;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateTitle({ [name]: value }));
  };

  const handleSave = () => {
    if (page.name !== page.previousName) updateTitleQuery();
    dispatch(updateTitle({ nameSelected: false }));
  };

  console.log(page);

  return (
    <MuiGrid
      columnSpacing={1}
      sx={{ marginLeft: theme.spacing(-2.5) }}
      container
    >
      <MuiGrid flexGrow={1} item>
        <TitleTextField
          name="name"
          value={page.name}
          fullWidth
          onChange={handleChange}
          onClick={() => {
            dispatch(
              updateTitle({ previousName: page.name, nameSelected: true }),
            );
          }}
        />
      </MuiGrid>
      {nameSelected && (
        <MuiGrid item>
          <PrimaryButton label="Save" onClick={handleSave} />
        </MuiGrid>
      )}
      {nameSelected && (
        <MuiGrid item>
          <CancelButton
            label="Cancel"
            onClick={() => {
              dispatch(
                updateTitle({ name: page.previousName, nameSelected: false }),
              );
            }}
          />
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

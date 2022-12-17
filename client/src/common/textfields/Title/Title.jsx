import { Fragment } from "react";
import { useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";

import TextField from "../TextField";
import SaveButton from "../../buttons/SaveButton";
import CancelButton from "../../buttons/CancelButton";

const TitleTextField = styled(TextField)(({ theme }) => {
  return {
    "& .MuiInputBase-input": {
      overflow: "hidden",
      paddingTop: "4px",
      textOverflow: "ellipsis",
      paddingBottom: "4px",
    },
    "& .MuiOutlinedInput-root ": {
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 600,
      backgroundColor: "transparent",
      "& fieldset": {
        border: `2px solid transparent`,
        borderRadius: "6px",
      },
      "&:hover": {
        transitionDuration: "250ms",
        backgroundColor: theme.palette.grey[200],
        "& fieldset": {
          border: `2px solid ${theme.palette.grey[200]}`,
          transitionDuration: "250ms",
        },
      },
      "&.Mui-focused": {
        backgroundColor: theme.palette.background.default,
        transitionDuration: "250ms",
        "& fieldset": {
          border: `2px solid ${theme.palette.primary.main}`,
          transitionDuration: "250ms",
        },
      },
    },
  };
});

const Title = ({ page, updateTitle, updateTitleQuery }) => {
  const dispatch = useDispatch();
  const { nameSelected } = page;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateTitle({ [name]: value }));
  };

  const handleSave = () => {
    if (page.name !== page.previousName) updateTitleQuery();
    dispatch(updateTitle({ nameSelected: false }));
  };

  return (
    <Fragment>
      <MuiGrid
        container
        columnSpacing={1}
        sx={{ marginLeft: "-24px", marginBottom: "4px" }}
      >
        <MuiGrid item flexGrow={1}>
          <TitleTextField
            name="name"
            value={page.name}
            onChange={handleChange}
            onClick={() =>
              dispatch(
                updateTitle({ previousName: page.name, nameSelected: true })
              )
            }
            fullWidth
          />
        </MuiGrid>
        {nameSelected && (
          <MuiGrid item>
            <SaveButton label="Save" onClick={handleSave} />
          </MuiGrid>
        )}
        {nameSelected && (
          <MuiGrid item>
            <CancelButton
              label="Cancel"
              onClick={() => {
                dispatch(
                  updateTitle({ name: page.previousName, nameSelected: false })
                );
              }}
            />
          </MuiGrid>
        )}
      </MuiGrid>
    </Fragment>
  );
};

export default Title;

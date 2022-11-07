import { Fragment } from "react";
import { useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import TextField from "../TextField";

const TitleTextField = styled(TextField)(({ theme }) => {
  return {
    "& .MuiInputBase-input": {
      paddingTop: "4px",
      paddingBottom: "4px",
    },
    "& .MuiOutlinedInput-root ": {
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 600,
      backgroundColor: "#FFF",
      "& fieldset": {
        borderRadius: "6px",
        border: `2px solid #FFF`,
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

const Title = ({ page, loading, updateTitle, updateTitleQuery }) => {
  const dispatch = useDispatch();
  const { nameSelected } = page;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(updateTitle({ [name]: value }));
  };

  const handleSave = () => {
    if (page.name !== page.previousName) updateTitleQuery();

    dispatch(updateTitle({ nameSelected: false }));
  };

  return (
    <Fragment>
      <MuiGrid container sx={{ marginLeft: "-14px", marginBottom: "4px" }}>
        <MuiGrid item flexGrow={1}>
          <TitleTextField
            name="name"
            value={page.name}
            onChange={handleChange}
            onClick={() => {
              dispatch(
                updateTitle({ previousName: page.name, nameSelected: true })
              );
            }}
            fullWidth
          />
        </MuiGrid>
        {nameSelected && (
          <MuiGrid item>
            <MuiButton
              variant="contained"
              onClick={handleSave}
              sx={{
                height: "100%",
                marginLeft: "8px",
                textTransform: "none",
                ":hover": { boxShadow: "none" },
              }}
            >
              <MuiTypography variant="body2">Save</MuiTypography>
            </MuiButton>
          </MuiGrid>
        )}
        {nameSelected && (
          <MuiGrid item>
            <MuiButton
              onClick={() => {
                dispatch(
                  updateTitle({ name: page.previousName, nameSelected: false })
                );
              }}
              sx={{
                color: "primary.text",
                height: "100%",
                marginLeft: "8px",
                textTransform: "none",
                ":hover": { backgroundColor: "action.hover" },
              }}
            >
              <MuiTypography variant="body2">Cancel</MuiTypography>
            </MuiButton>
          </MuiGrid>
        )}
      </MuiGrid>
    </Fragment>
  );
};

export default Title;

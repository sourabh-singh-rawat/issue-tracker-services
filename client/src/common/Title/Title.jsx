import { Fragment } from "react";
import { useDispatch } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiSkeleton from "@mui/material/Skeleton";

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
      {nameSelected ? (
        <MuiGrid container sx={{ marginLeft: "-14px", marginBottom: "4px" }}>
          <MuiGrid item flexGrow={1}>
            <MuiTextField
              name="name"
              value={page.name}
              onChange={handleChange}
              inputProps={{
                style: {
                  padding: "0 14px",
                  fontSize: "30px",
                  fontWeight: 600,
                },
              }}
              autoFocus
              fullWidth
            />
          </MuiGrid>
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
        </MuiGrid>
      ) : (
        <Fragment>
          {loading ? (
            <MuiSkeleton />
          ) : (
            <MuiGrid container sx={{ marginBottom: "4px" }}>
              <MuiGrid item flexGrow={1}>
                <MuiTypography
                  variant="h4"
                  sx={{
                    lineHeight: 1.5,
                    padding: "0px 14px",
                    marginLeft: "-14px",
                    fontWeight: 600,
                    borderRadius: "6px",
                    transition: "250ms",
                    ":hover": {
                      cursor: "text",
                      backgroundColor: "action.hover",
                    },
                  }}
                  onClick={() => {
                    dispatch(
                      updateTitle({
                        previousName: page.name,
                        nameSelected: true,
                      })
                    );
                  }}
                >
                  {page.name}
                </MuiTypography>
              </MuiGrid>
            </MuiGrid>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Title;

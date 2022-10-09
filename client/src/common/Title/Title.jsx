import { Fragment } from "react";
import { useDispatch } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiSkeleton from "@mui/material/Skeleton";

import Breadcrumbs from "../Breadcrumbs";

export default function Title({
  loading,
  page,
  updateTitle,
  updateTitleQuery,
  breadcrumbItems,
}) {
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
      <Breadcrumbs loading={loading} items={breadcrumbItems} />
      {nameSelected ? (
        <MuiGrid container sx={{ marginLeft: "-14px" }}>
          <MuiGrid item flexGrow={1}>
            <MuiTextField
              autoFocus
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
            <MuiGrid item xs={12}>
              <MuiTypography
                variant="h4"
                sx={{
                  padding: "0px 14px",
                  marginLeft: "-14px",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  borderRadius: "4px",
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
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

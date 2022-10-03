import { Fragment } from "react";
import { useDispatch } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";

import Breadcrumbs from "../Breadcrumbs";

export default function Title({
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
      <Breadcrumbs items={breadcrumbItems} />
      {nameSelected ? (
        <MuiBox
          sx={{ display: "flex", alignItems: "flex-end", marginLeft: "-14px" }}
        >
          <MuiTextField
            autoFocus
            name="name"
            value={page.name}
            onChange={handleChange}
            inputProps={{
              style: {
                padding: "0 14px",
                fontSize: "32px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          />
          <MuiButton
            variant="contained"
            onClick={handleSave}
            sx={{
              marginLeft: "5px",
              textTransform: "none",
              ":hover": { boxShadow: "none" },
            }}
          >
            <MuiTypography variant="body2">Save</MuiTypography>
          </MuiButton>
          <MuiButton
            onClick={() => {
              dispatch(
                updateTitle({ name: page.previousName, nameSelected: false })
              );
            }}
            sx={{
              color: "primary.text",
              marginLeft: "5px",
              textTransform: "none",
              backgroundColor: "background.main",
              ":hover": { backgroundColor: "background.main2" },
            }}
          >
            <MuiTypography variant="body2">Cancel</MuiTypography>
          </MuiButton>
        </MuiBox>
      ) : (
        <MuiGrid item xs={12}>
          <MuiTypography
            variant="h4"
            sx={{
              color: "text.main",
              padding: "0px 14px",
              marginLeft: "-14px",
              lineHeight: 1.5,
              fontWeight: 600,
              borderRadius: "4px",
              ":hover": {
                backgroundColor: "background.edit",
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
  );
}

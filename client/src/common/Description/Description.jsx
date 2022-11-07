import { Fragment } from "react";
import { useDispatch } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";

const Description = ({
  page,
  updateDescription,
  updateDescriptionQuery,
  loading,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateDescription({ description: e.target.value }));
  };

  const handleSave = async () => {
    if (page.description !== page.previousDescription) updateDescriptionQuery();

    dispatch(updateDescription({ descriptionSelected: false }));
  };

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        {page.descriptionSelected ? (
          <MuiTextField
            size="small"
            value={page.description}
            onChange={handleChange}
            inputProps={{
              style: { fontSize: "14px", lineHeight: 1.5 },
            }}
            minRows={4}
            autoFocus
            multiline
            fullWidth
          />
        ) : (
          <Fragment>
            {loading ? (
              <Fragment>
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" width="20%" />
              </Fragment>
            ) : (
              <MuiTypography
                variant="body2"
                onClick={() => {
                  dispatch(
                    updateDescription({
                      descriptionSelected: true,
                      previousDescription: page.description,
                    })
                  );
                }}
                sx={{
                  lineHeight: 1.5,
                  padding: "8px 14px",
                  marginLeft: "-14px",
                  borderRadius: "6px",
                  color: "text.primary",
                  transition: "250ms",
                  ":hover": { backgroundColor: "action.hover" },
                }}
              >
                {page.description ? page.description : "Add a description..."}
              </MuiTypography>
            )}
          </Fragment>
        )}
      </MuiGrid>
      {page.descriptionSelected && (
        <MuiGrid item sm={12} sx={{ padding: "8px 0" }}>
          <MuiButton
            variant="contained"
            onClick={handleSave}
            sx={{
              boxShadow: "none",
              textTransform: "none",
              ":hover": { boxShadow: "none" },
            }}
          >
            <MuiTypography variant="body2">Save</MuiTypography>
          </MuiButton>
          <MuiButton
            onClick={() =>
              dispatch(
                updateDescription({
                  descriptionSelected: false,
                  description: page.previousDescription,
                })
              )
            }
            sx={{
              color: "text.main",
              marginLeft: "5px",
              textTransform: "none",
              ":hover": { backgroundColor: "background.edit" },
            }}
          >
            <MuiTypography variant="body2" sx={{ fontWeight: 600 }}>
              Cancel
            </MuiTypography>
          </MuiButton>
        </MuiGrid>
      )}
    </MuiGrid>
  );
};

export default Description;

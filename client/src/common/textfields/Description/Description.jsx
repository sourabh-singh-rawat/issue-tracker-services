import { Fragment } from "react";
import { useDispatch } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";

import SaveButton from "../../buttons/SaveButton";
import TextField from "../TextField";
import CancelButton from "../../buttons/CancelButton/CancelButton";

const Description = ({
  page,
  updateDescription,
  updateDescriptionQuery,
  isLoading,
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
    <MuiGrid container rowSpacing={1}>
      <MuiGrid item xs={12}>
        <MuiTypography variant="body2" fontWeight={600}>
          Description:
        </MuiTypography>
        {page.descriptionSelected ? (
          <TextField
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
            {isLoading ? (
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
        <MuiGrid item sm={12}>
          <MuiGrid container spacing={1}>
            <MuiGrid item>
              <SaveButton label="Save" onClick={handleSave} />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton
                label="Cancel"
                onClick={() =>
                  dispatch(
                    updateDescription({
                      descriptionSelected: false,
                      description: page.previousDescription,
                    })
                  )
                }
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiGrid>
  );
};

export default Description;

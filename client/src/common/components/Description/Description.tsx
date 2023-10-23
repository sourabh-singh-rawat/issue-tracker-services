import React from "react";
import { useDispatch } from "react-redux";

import { TextField, useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import CancelButton from "../CancelButton";

interface DescriptionProps {
  isLoading: boolean;
}

function Description({
  page,
  updateDescription,
  updateDescriptionQuery,
  isLoading,
}: DescriptionProps) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateDescription({ description: e.target.value }));
  };

  const handleSave = async () => {
    if (page.description !== page.previousDescription) updateDescriptionQuery();

    dispatch(updateDescription({ descriptionSelected: false }));
  };

  return (
    <MuiGrid rowSpacing={2} container>
      <MuiGrid xs={12} item>
        <MuiTypography
          variant="body1"
          sx={{ color: theme.palette.text.secondary, fontWeight: "bold" }}
        >
          Description
        </MuiTypography>
        {page.descriptionSelected ? (
          <TextField
            rows={4}
            size="small"
            value={page.description}
            onChange={handleChange}
            autoFocus
            fullWidth
            multiline
          />
        ) : (
          <>
            {isLoading ? (
              <>
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" />
                <MuiSkeleton variant="text" width="20%" />
              </>
            ) : (
              <MuiTypography
                sx={{
                  lineHeight: 1.5,
                  padding: "8px 14px",
                  marginLeft: "-14px",
                  borderRadius: "6px",
                  color: "text.primary",
                  transition: "250ms",
                  ":hover": { backgroundColor: "action.hover" },
                }}
                variant="body2"
                onClick={() => {
                  dispatch(
                    updateDescription({
                      descriptionSelected: true,
                      previousDescription: page.description,
                    }),
                  );
                }}
              >
                {page.description ? page.description : "Add a description..."}
              </MuiTypography>
            )}
          </>
        )}
      </MuiGrid>
      {page.descriptionSelected && (
        <MuiGrid sm={12} item>
          <MuiGrid spacing={1} container>
            <MuiGrid item>
              <CancelButton label="Save" onClick={handleSave} />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton
                label="Cancel"
                onClick={() =>
                  dispatch(
                    updateDescription({
                      descriptionSelected: false,
                      description: page.previousDescription,
                    }),
                  )
                }
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default Description;

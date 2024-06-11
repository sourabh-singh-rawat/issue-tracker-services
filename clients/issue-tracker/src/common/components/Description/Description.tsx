import React, { useState } from "react";

import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import CancelButton from "../CancelButton";
import PrimaryButton from "../buttons/PrimaryButton";

interface Props<T extends { name: string; description: string }> {
  page: T;
  setPage: React.Dispatch<React.SetStateAction<T>>;
  isLoading: boolean;
  updateQuery: () => Promise<void>;
  isDisabled?: boolean;
}

export default function Description<
  T extends { name: string; description: string },
>({ page, setPage, isLoading, updateQuery, isDisabled }: Props<T>) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [previousDescription, setPreviousDescription] = useState("");

  const handleSubmit = async () => {
    if (page?.description !== previousDescription) await updateQuery();
    setIsFocused(false);
  };

  const handleClick = () => {
    setIsFocused(true);
    setPreviousDescription(page.description);
  };

  const handleCancel = () => {
    setIsFocused(false);
    setPage({ ...page, description: previousDescription });
  };

  return (
    <MuiGrid rowSpacing={1} container>
      <MuiGrid xs={12} item>
        <MuiTypography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          Description
        </MuiTypography>
        {isFocused && !isDisabled ? (
          <TextField
            size="small"
            value={page?.description}
            onChange={(e) => setPage({ ...page, description: e.target.value })}
            inputProps={{
              style: { fontSize: theme.typography.body2.fontSize },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: theme.shape.borderRadiusMedium,
              },
              borderRadius: theme.shape.borderRadiusLarge,
            }}
            disabled={isDisabled}
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
                  padding: theme.spacing(1),
                  marginLeft: theme.spacing(-1),
                  borderRadius: theme.shape.borderRadiusMedium,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
                variant="body2"
                onClick={handleClick}
              >
                {page?.description ? page?.description : "Add a description..."}
              </MuiTypography>
            )}
          </>
        )}
      </MuiGrid>
      {isFocused && !isDisabled && (
        <MuiGrid sm={12} item>
          <MuiGrid spacing={1} container>
            <MuiGrid item>
              <PrimaryButton label="Save" onClick={handleSubmit} />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton label="Cancel" onClick={handleCancel} />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

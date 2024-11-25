import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  handleSubmit: (value: string) => void;
  defaultValue?: string | null;
  isDisabled?: boolean;
  isLoading?: boolean;
}
export default function ItemDescription({
  defaultValue = "",
  handleSubmit: handleSubmit,
  isDisabled,
  isLoading,
}: Props) {
  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [previousValue, setPreviousValue] = useState(defaultValue);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const textValue = e.target.value;
    setValue(textValue);
  };

  const handleClick = () => {
    setPreviousValue(value);
    setIsFocused(true);
  };

  const handleCancel = () => {
    setIsFocused(false);
    setValue(previousValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <MuiGrid rowSpacing={1} container>
      <MuiGrid xs={12} item>
        {isFocused && !isDisabled ? (
          <TextField
            size="small"
            value={value}
            onChange={handleChange}
            inputProps={{
              style: { fontSize: theme.typography.h6.fontSize },
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
                  fontSize: theme.typography.h6.fontSize,
                  padding: theme.spacing(1),
                  marginLeft: theme.spacing(-1),
                  borderRadius: theme.shape.borderRadiusMedium,
                  color: theme.palette.text.secondary,
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
                variant="body2"
                onClick={handleClick}
              >
                {value ? value : "Add a description"}
              </MuiTypography>
            )}
          </>
        )}
      </MuiGrid>
      {isFocused && !isDisabled && (
        <MuiGrid sm={12} item>
          <MuiGrid spacing={1} container>
            <MuiGrid item flexGrow={1}></MuiGrid>
            <MuiGrid item>
              <MuiIconButton
                size="small"
                onClick={() => {
                  if (value && value !== previousValue) handleSubmit(value);
                  setIsFocused(false);
                }}
              >
                <DoneIcon />
              </MuiIconButton>
            </MuiGrid>
            <MuiGrid item>
              <MuiIconButton size="small" onClick={handleCancel}>
                <CloseIcon />
              </MuiIconButton>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

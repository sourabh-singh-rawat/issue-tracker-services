import { ClickAwayListener } from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { alpha, styled, useTheme } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateItemInput, useUpdateItemMutation } from "../../../api";
import { TextField } from "../forms";
import { useSnackbar } from "../Snackbar";

const TitleTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    overflow: "hidden",
    paddingTop: theme.spacing(0.35),
    paddingBottom: theme.spacing(0.35),
    textOverflow: "ellipsis",
    borderRadius: theme.shape.borderRadiusMedium,
    paddingLeft: theme.spacing(1),
  },
  "& .MuiOutlinedInput-root": {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
    backgroundColor: "transparent",
    borderRadius: theme.shape.borderRadiusMedium,
    "& fieldset": { border: "2px solid transparent" },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      "& fieldset": { border: `2px solid ${theme.palette.grey[200]}` },
    },
    "&.Mui-focused": {
      "& fieldset": { borderColor: theme.palette.primary.main },
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

interface ItemNameProps {
  itemId: string;
  initialValue?: string;
}

/**
 * Update the item name
 * @param props.itemId
 * @returns
 */
export const ItemName = ({ itemId, initialValue = "" }: ItemNameProps) => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const form = useForm();
  const [defaultValue, setDefaultValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [updateItem, { loading: isLoading }] = useUpdateItemMutation({
    onCompleted() {
      snackbar.success("Name updated successfully");
    },
  });

  const handleClick = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    if (isLoading) return;

    setIsFocused(false);
    form.setValue("name", defaultValue);
  };

  const onSubmit: SubmitHandler<Pick<UpdateItemInput, "name">> = async ({
    name,
  }) => {
    if (isLoading) return;

    await updateItem({ variables: { input: { itemId, name } } });

    if (name) setDefaultValue(name);

    setIsFocused(false);
  };

  useEffect(() => {
    if (initialValue) {
      form.setValue("name", initialValue);
      setDefaultValue(initialValue);
    }
  }, [initialValue]);

  return (
    <ClickAwayListener onClickAway={() => setIsFocused(false)}>
      <Grid2
        container
        sx={{ mt: theme.spacing(1), ml: theme.spacing(-2) }}
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Grid2 flexGrow={1}>
          {isFocused ? (
            <TextField
              form={form}
              name="name"
              sx={{
                fontSize: theme.typography.h4,
                ".MuiInputBase-input": {
                  fontWeight: theme.typography.fontWeightBold,
                  px: theme.spacing(2),
                  py: theme.spacing(0.25),
                },
              }}
              autoFocus
            />
          ) : (
            <Typography
              sx={{
                px: theme.spacing(2),
                py: theme.spacing(0.5),
                fontWeight: "bold",
                borderRadius: theme.shape.borderRadiusSmall,
                color: theme.palette.text.secondary,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
              variant="h4"
              onClick={handleClick}
            >
              {form.watch("name") || "Untitled"}
            </Typography>
          )}
        </Grid2>

        {isFocused && (
          <Grid2 size={12}>
            <Grid2 spacing={1} container>
              <Grid2 flexGrow={1}></Grid2>
              <Grid2>
                <IconButton
                  size="small"
                  type="submit"
                  sx={{ borderRadius: theme.shape.borderRadiusMedium }}
                >
                  <DoneIcon />
                </IconButton>
              </Grid2>
              <Grid2>
                <IconButton
                  size="small"
                  onClick={handleCancel}
                  sx={{ borderRadius: theme.shape.borderRadiusMedium }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid2>
            </Grid2>
          </Grid2>
        )}
      </Grid2>
    </ClickAwayListener>
  );
};

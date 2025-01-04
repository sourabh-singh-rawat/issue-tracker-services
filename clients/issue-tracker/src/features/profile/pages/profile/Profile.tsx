import { Avatar, Grid2, Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../../common";
import Button from "../../../../common/components/buttons/Button";
import { TextField } from "../../../../common/components/forms";
import { UploadButton } from "../../../item/components/UploadButton";

export const Profile = () => {
  const theme = useTheme();
  const { current } = useAppSelector((x) => x.auth);
  const form = useForm({ defaultValues: { displayName: "", email: "" } });

  useEffect(() => {
    if (current?.displayName) {
      form.setValue("displayName", current.displayName);
      form.setValue("email", current.email);
    }
  }, [current]);

  return (
    current && (
      <Grid2 container sx={{ p: theme.spacing(2) }} rowSpacing={1}>
        <Grid2 size={12}>
          <Typography variant="h4" fontWeight="bold">
            Your Profile
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Grid2 container sx={{ py: theme.spacing(2) }} columnSpacing={1}>
            <Grid2>
              <Avatar sx={{ width: 50, height: 50 }}>
                <Typography fontWeight="bold" variant="h5">
                  {current.displayName?.slice(0, 1)}
                </Typography>
              </Avatar>
            </Grid2>
            <Grid2>
              <Grid2 container spacing={1}>
                <Grid2>
                  <Stack spacing={1} direction="row">
                    <UploadButton label="Upload Image" onClick={() => {}} />
                    <Button label="Remove" size="small" variant="outlined" />
                  </Stack>
                </Grid2>
                <Grid2 size={12}>
                  <Typography variant="body2">
                    We support PNG and JPEGs under 10MB
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2 size={12}>
          <Typography variant="h6">General</Typography>
          <Stack spacing={1}>
            <Typography variant="body2"></Typography>
            <TextField
              form={form}
              name="displayName"
              label="Display Name"
              placeholder="Name"
            />
            <TextField
              form={form}
              name="email"
              label="Email"
              placeholder="Email"
            />
          </Stack>
        </Grid2>
      </Grid2>
    )
  );
};

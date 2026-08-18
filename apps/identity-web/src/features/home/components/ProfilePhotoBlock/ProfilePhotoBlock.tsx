import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const ProfilePhotoBlock = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          px: 3,
          py: 2.5,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Profile photo
        </Typography>
      </Box>
    </Paper>
  );
};

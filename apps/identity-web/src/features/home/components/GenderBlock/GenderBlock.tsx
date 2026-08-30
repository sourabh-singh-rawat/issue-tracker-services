import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import { formatGenderLabel } from "@features/home/utils";

type GenderBlockProps = {
  gender?: string | null;
  to: "/gender";
};

export const GenderBlock = ({ gender, to }: GenderBlockProps) => {
  const label = formatGenderLabel(gender);

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        component={Link}
        to={to}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          px: 3,
          py: 2.5,
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Gender
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          {label ? (
            <Typography color="text.secondary" noWrap>
              {label}
            </Typography>
          ) : null}
          <Typography color="text.secondary" aria-hidden>
            ›
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { MouseEvent } from "react";

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  handleClose: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function ModalHeader({ title, subtitle, handleClose }: ModalHeaderProps) {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 2 }}>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {title}
          </Typography>
          <IconButton
            onClick={handleClose}
            aria-label="Close"
            size="small"
            sx={{
              "&:hover": { backgroundColor: theme.palette.action.hover },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Stack>
        {subtitle ? (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
}

export default ModalHeader;

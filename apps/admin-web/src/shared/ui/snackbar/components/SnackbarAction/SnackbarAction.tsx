import IconButton from "@mui/material/IconButton";
import { closeSnackbar, type SnackbarKey } from "notistack";

type SnackbarActionProps = {
  snackbarId: SnackbarKey;
};

/** Minimal close control — no icons package dependency. */
export function SnackbarAction({ snackbarId }: SnackbarActionProps) {
  return (
    <IconButton
      size="small"
      aria-label="Dismiss"
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
      sx={{
        color: "inherit",
        opacity: 0.72,
        ml: 0.5,
        p: 0.5,
        "&:hover": { opacity: 1, backgroundColor: "rgba(255, 255, 255, 0.12)" },
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M4.2 4.2l7.6 7.6M11.8 4.2l-7.6 7.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </IconButton>
  );
}

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Search from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import { getErrorMessage } from "@shared/ui";

export type CapabilityOption = {
  key: string;
  name: string | null;
  description: string | null;
};

export type CapabilityMultiSelectProps = {
  capabilities: CapabilityOption[];
  value: string[];
  onChange: (keys: string[]) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  disabled?: boolean;
};

function groupKeyForCapability(key: string): string {
  const parts = key.split(".").filter(Boolean);
  if (parts.length <= 1) {
    return "Other";
  }
  return parts.slice(0, -1).join(".");
}

function formatGroupLabel(group: string): string {
  return group
    .split(".")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" · ");
}

export const CapabilityMultiSelect = ({
  capabilities,
  value,
  onChange,
  isLoading = false,
  isError = false,
  error,
  disabled = false,
}: CapabilityMultiSelectProps) => {
  const [filter, setFilter] = useState("");
  const selected = useMemo(() => new Set(value), [value]);

  const filtered = useMemo(() => {
    const query = filter.trim().toLowerCase();
    const list = capabilities.filter((capability) => Boolean(capability.key));
    if (!query) {
      return list;
    }
    return list.filter((capability) => {
      const haystack = [capability.key, capability.name, capability.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [filter, capabilities]);

  const grouped = useMemo(() => {
    const map = new Map<string, CapabilityOption[]>();
    for (const capability of filtered) {
      const group = groupKeyForCapability(capability.key);
      const existing = map.get(group);
      if (existing) {
        existing.push(capability);
      } else {
        map.set(group, [capability]);
      }
    }
    for (const group of map.values()) {
      group.sort((a, b) => (a.name ?? a.key).localeCompare(b.name ?? b.key));
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const toggle = (key: string) => {
    if (disabled) {
      return;
    }
    if (selected.has(key)) {
      onChange(value.filter((item) => item !== key));
      return;
    }
    onChange([...value, key]);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "baseline", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Capabilities
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Optional. Select capability resources to grant on this role.
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
          {value.length} selected
        </Typography>
      </Stack>

      <TextField
        size="small"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
        placeholder="Filter capabilities"
        disabled={disabled || isLoading}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      ) : null}

      {isError ? (
        <Alert severity="error">
          {getErrorMessage(error, "Failed to load capabilities")}
        </Alert>
      ) : null}

      {!isLoading && !isError ? (
        <Paper variant="outlined" sx={{ maxHeight: 280, overflow: "auto" }}>
          {grouped.length === 0 ? (
            <Box sx={{ px: 2, py: 3 }}>
              <Typography color="text.secondary" variant="body2">
                {capabilities.length === 0
                  ? "No capabilities available."
                  : "No capabilities match your filter."}
              </Typography>
            </Box>
          ) : (
            <List dense disablePadding>
              {grouped.map(([group, items]) => (
                <Box key={group} component="li" sx={{ listStyle: "none" }}>
                  <ListSubheader
                    sx={{
                      bgcolor: "background.paper",
                      lineHeight: 2.25,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {formatGroupLabel(group)}
                  </ListSubheader>
                  {items.map((capability) => {
                    const key = capability.key;
                    const checked = selected.has(key);
                    return (
                      <ListItemButton
                        key={key}
                        dense
                        disabled={disabled}
                        selected={checked}
                        onClick={() => {
                          toggle(key);
                        }}
                        sx={{ alignItems: "flex-start", py: 0.75 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36, mt: 0.25 }}>
                          <Checkbox
                            edge="start"
                            checked={checked}
                            tabIndex={-1}
                            disableRipple
                            size="small"
                            slotProps={{
                              input: {
                                "aria-labelledby": `capability-option-${key}`,
                              },
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={`capability-option-${key}`}
                          primary={capability.name ?? key}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{
                                  display: "block",
                                  fontFamily: "monospace",
                                  color: "text.secondary",
                                }}
                              >
                                {key}
                              </Typography>
                              {capability.description ? (
                                <Typography
                                  component="span"
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {capability.description}
                                </Typography>
                              ) : null}
                            </>
                          }
                          slotProps={{
                            primary: { variant: "body2", sx: { fontWeight: 500 } },
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </Box>
              ))}
            </List>
          )}
        </Paper>
      ) : null}
    </Stack>
  );
};

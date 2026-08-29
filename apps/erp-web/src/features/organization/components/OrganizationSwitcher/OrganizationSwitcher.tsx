import BusinessOutlined from "@mui/icons-material/BusinessOutlined";
import Check from "@mui/icons-material/Check";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState, type MouseEvent } from "react";
import {
  type CurrentOrganization,
  useOrganizationStore,
} from "../../store";

export const OrganizationSwitcher = () => {
  const organizations = useOrganizationStore((s) => s.organizations);
  const currentOrganization = useOrganizationStore((s) => s.currentOrganization);
  const isLoading = useOrganizationStore((s) => s.isLoading);
  const setCurrentOrganization = useOrganizationStore((s) => s.setCurrentOrganization);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (isLoading) {
    return <CircularProgress size={16} />;
  }

  if (organizations.length === 0) {
    return null;
  }

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (organization: CurrentOrganization) => {
    setCurrentOrganization(organization);
    handleClose();
  };

  const label = currentOrganization?.name ?? "Select organization";

  return (
    <>
      <Button
        size="small"
        color="inherit"
        onClick={handleOpen}
        startIcon={<BusinessOutlined fontSize="small" />}
        endIcon={<KeyboardArrowDown fontSize="small" />}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorEl)}
        aria-label="Switch organization"
        sx={{
          textTransform: "none",
          maxWidth: 220,
          color: "text.primary",
        }}
      >
        <Typography variant="body2" noWrap fontWeight={600}>
          {label}
        </Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {organizations.map((organization) => {
          const selected = organization.id === currentOrganization?.id;
          return (
            <MenuItem
              key={organization.id}
              selected={selected}
              dense
              onClick={() => handleSelect(organization)}
            >
              {selected ? (
                <ListItemIcon>
                  <Check fontSize="small" />
                </ListItemIcon>
              ) : (
                <ListItemIcon />
              )}
              <ListItemText
                primary={organization.name}
                secondary={organization.slug}
                primaryTypographyProps={{ noWrap: true }}
                secondaryTypographyProps={{ noWrap: true }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

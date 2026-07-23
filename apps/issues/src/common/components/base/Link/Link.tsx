import { Link as LinkComponent, useTheme } from "@mui/material";
import { createLink } from "@tanstack/react-router";

const CreatedLinkComponent = createLink(LinkComponent);

interface LinkProps {
  to: string;
  children: React.ReactElement | string;
}

/**
 * Custom Link component that uses the router Link to navigate to different routes
 * @param props.to - The url to navigate to
 * @param props.children - The children element of link
 */
export const Link = ({ to, children }: LinkProps) => {
  const theme = useTheme();

  return (
    <CreatedLinkComponent
      to={to as "/"}
      onClick={(e) => e.stopPropagation()}
      underline="none"
      sx={{
        color: theme.palette.text.primary,
        ":hover": {
          color: theme.palette.primary.main,
        },
      }}
    >
      {children}
    </CreatedLinkComponent>
  );
};

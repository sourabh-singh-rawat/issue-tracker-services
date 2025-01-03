import { Link as LinkComponent, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactElement | string;
}

/**
 * Custom Link component that uses router dom's Link to navigate to different routes
 * @param props.to - The url to navigate to
 * @param props.children - The children element of link
 */
export const Link = ({ to, children }: LinkProps) => {
  const theme = useTheme();

  return (
    <LinkComponent
      to={to}
      component={RouterLink}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </LinkComponent>
  );
};

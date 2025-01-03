import {
  Breadcrumbs,
  Link,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

interface CustomBreadcrumbsProps {
  items: { text: string; onClick?: () => void }[];
  isLoading?: boolean;
}

export const CustomBreadcrumbs = ({
  items,
  isLoading,
}: CustomBreadcrumbsProps) => {
  const theme = useTheme();

  return (
    <Breadcrumbs separator={"/"}>
      {items.map(({ text, onClick }, index) => (
        <span key={index}>
          {isLoading ? (
            <Skeleton height="20px" variant="text" width="75px" />
          ) : (
            <Link
              sx={{ cursor: "pointer", color: theme.palette.text.secondary }}
              underline="hover"
              onClick={onClick}
            >
              <Typography sx={{ fontWeight: 500 }} variant="h6">
                {text}
              </Typography>
            </Link>
          )}
        </span>
      ))}
    </Breadcrumbs>
  );
};

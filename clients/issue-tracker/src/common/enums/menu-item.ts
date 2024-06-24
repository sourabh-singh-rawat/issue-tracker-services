export interface MenuItem {
  text: string;
  to?: string;
  icon?: React.ReactElement;
  isVisible?: boolean;
  onClick?: () => void;
}

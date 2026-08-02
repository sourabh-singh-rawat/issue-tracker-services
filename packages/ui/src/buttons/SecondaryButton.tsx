import type { ButtonProps } from "./Button";
import Button from "./Button";

export function SecondaryButton({ onClick, label, type }: ButtonProps) {
  return <Button label={label} onClick={onClick} variant="text" color="secondary" type={type} />;
}

export default SecondaryButton;

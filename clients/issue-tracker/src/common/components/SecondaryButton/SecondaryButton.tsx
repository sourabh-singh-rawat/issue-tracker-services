import React from "react";
import { ButtonProps } from "../buttons";
import Button from "../buttons/Button";

export default function SecondaryButton({ onClick, label, type }: ButtonProps) {
  return (
    <Button
      label={label}
      onClick={onClick}
      variant="text"
      color="secondary"
      type={type}
    />
  );
}

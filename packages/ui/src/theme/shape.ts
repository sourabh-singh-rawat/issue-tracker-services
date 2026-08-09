import type { Theme } from "@mui/material/styles";

export type PineShape = {
  borderRadiusNone: string;
  borderRadiusSmall: string;
  borderRadiusMedium: string;
  borderRadiusLarge: string;
  borderRadiusExtraLarge: string;
  borderRadiusExtraExtraLarge: string;
  borderRadiusRounded: string;
};

export const pineShape: PineShape = {
  borderRadiusNone: "0",
  borderRadiusSmall: "0.2rem",
  borderRadiusMedium: "0.4rem",
  borderRadiusLarge: "0.6rem",
  borderRadiusExtraLarge: "1rem",
  borderRadiusExtraExtraLarge: "1.6rem",
  borderRadiusRounded: "9000px",
};

type ShapeWithMedium = Theme["shape"] & { borderRadiusMedium?: string | number };

export function themeBorderRadiusMedium(theme: Theme): string | number {
  const shape = theme.shape as ShapeWithMedium;
  return shape.borderRadiusMedium ?? shape.borderRadius ?? pineShape.borderRadiusMedium;
}

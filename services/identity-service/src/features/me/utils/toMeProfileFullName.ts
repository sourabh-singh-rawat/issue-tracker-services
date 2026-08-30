export const toMeProfileFullName = (
  firstName: string,
  middleName?: string | null,
  lastName?: string | null,
): string => [firstName, middleName, lastName].filter(Boolean).join(" ");

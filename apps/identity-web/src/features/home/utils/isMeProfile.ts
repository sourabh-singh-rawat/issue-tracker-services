export type MeProfile = {
  firstName: string;
  middleName?: string | null;
  lastName?: string | null;
  fullName: string;
  gender?: string | null;
};

const isOptionalNamePart = (value: unknown): value is string | null | undefined =>
  value === undefined || value === null || typeof value === "string";

export const isMeProfile = (value: unknown): value is MeProfile => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  if (!("firstName" in value) || !("fullName" in value)) {
    return false;
  }

  const middleName = "middleName" in value ? value.middleName : undefined;
  const lastName = "lastName" in value ? value.lastName : undefined;
  const gender = "gender" in value ? value.gender : undefined;

  return (
    typeof value.firstName === "string" &&
    typeof value.fullName === "string" &&
    isOptionalNamePart(middleName) &&
    isOptionalNamePart(lastName) &&
    isOptionalNamePart(gender)
  );
};

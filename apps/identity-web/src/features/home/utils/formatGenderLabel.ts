export const formatGenderLabel = (gender: string | null | undefined) => {
  if (gender === "MALE") {
    return "Male";
  }

  if (gender === "FEMALE") {
    return "Female";
  }

  if (gender === "UNSPECIFIED") {
    return "Rather not say";
  }

  return "";
};

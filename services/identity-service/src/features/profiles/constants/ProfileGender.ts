export const ProfileGender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
  UNSPECIFIED: "UNSPECIFIED",
} as const;

export type ProfileGender = (typeof ProfileGender)[keyof typeof ProfileGender];

export const isProfileGender = (value: string): value is ProfileGender =>
  value === ProfileGender.MALE ||
  value === ProfileGender.FEMALE ||
  value === ProfileGender.OTHER ||
  value === ProfileGender.UNSPECIFIED;

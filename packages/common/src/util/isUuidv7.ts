import { validate, version } from "uuid";

export const isUuidv7 = (value: string): boolean => validate(value) && version(value) === 7;

type NestedObject = {
  [key: string]: string | NestedObject;
};

export const flattenObject = (
  nestedObj: NestedObject,
): Record<string, string> => {
  const flattenedObj: Record<string, string> = {};

  Object.keys(nestedObj).forEach((key) => {
    const value = nestedObj[key];
    if (typeof value === "object" && value !== null) {
      const flatObject = flattenObject(value);
      Object.keys(flatObject).forEach((nestedKey) => {
        flattenedObj[`${key}.${nestedKey}`] = flatObject[nestedKey];
      });
    } else {
      flattenedObj[key] = value as string;
    }
  });

  return flattenedObj;
};

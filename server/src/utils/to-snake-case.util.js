/* eslint-disable implicit-arrow-linebreak */
const toSnakeCase = (str) =>
  str.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);

export default toSnakeCase;

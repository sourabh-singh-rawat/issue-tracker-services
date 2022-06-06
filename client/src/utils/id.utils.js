// generate id using name
export const createId = (text) => {
  return text.match(/\b(\w)/g).join("");
};

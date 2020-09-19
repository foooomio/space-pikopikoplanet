export const generateId = () => Math.random().toString(16).slice(-10);

export const doubleEscape = (str) =>
  encodeURIComponent(encodeURIComponent(str));

export const isUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

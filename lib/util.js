export const generateId = () => Math.random().toString(16).slice(-10);

export const unflat = (array, step) => {
  const newArray = [];

  for (let i = 0; i < array.length; i += step) {
    newArray.push(array.slice(i, i + step));
  }

  return newArray;
};

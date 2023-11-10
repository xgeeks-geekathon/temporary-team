export const createArray = (length: number) => new Array(length).fill(null);

export const randomNumber = (min = 0, max = 100) => {
  return Math.random() * (max - min) + min;
};

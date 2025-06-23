export const makeIndexComparable = <T>(
  index: number
): T => {
  return index as T;
};

export const compare = <T>(
  leftOne: T,
  rightOne: T
): boolean => {
  return leftOne < rightOne;
};

export const isEqual = <T>(
  leftOne: T,
  rightOne: T
): boolean => {
  return leftOne === rightOne;
};

export const calculateMidIndex = (
  leftIndex: number,
  rightIndex: number
): number => {
  return Math.floor(leftIndex + (rightIndex - leftIndex) / 2);
};
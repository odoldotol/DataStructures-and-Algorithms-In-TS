export const makeIndexComparable = <T>(
  index: number
): T => {
  return index as T;
};

export const isTargetInLeftSide = <T>(
  comparable: T,
  target: T,
  compareFn: (leftOne: T, rightOne: T) => boolean = compare,
): boolean => {
  return compareFn(target, comparable);
};

export const isTarget = <T>(
  comparable: T,
  target: T,
  isEqualFn: (a: T, b: T) => boolean = isEqual,
): boolean => {
  return isEqualFn(comparable, target);
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
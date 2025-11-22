export type Comparator<T> = (top: T, bottom: T) => boolean;

export const minHeapComparator = <T>(top: T, bottom: T): boolean => {
  return top < bottom;
};

export const maxHeapComparator = <T>(top: T, bottom: T): boolean => {
  return top > bottom;
};
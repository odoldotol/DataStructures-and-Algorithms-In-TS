/**
 * @returns a 가 b 보다 우선순위가 높으면 음수, 같으면 0, 낮으면 양수
 */
export type Comparator<T = any> = (a: T, b: T) => number;

export const minHeapComparator: Comparator = (a, b) => {
  return a < b ? -1 : a == b ? 0 : 1;
};

export const maxHeapComparator: Comparator = (a, b) => {
  return a > b ? -1 : a == b ? 0 : 1;
};
/**
 * Reverse the array in place.  
 * Two-Pointer Technique
 * @param array The array to reverse.
 * 
 * @param leftIndex The starting index from which to reverse (inclusive).
 * @param rightIndex The ending index to which to reverse (inclusive).
 * 
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * reverse(arr); // arr is now [5, 4, 3, 2, 1]
 * reverse(arr, 1, 3); // arr is now [5, 2, 3, 4, 1]
 * @throws {Error} If leftIndex or rightIndex is out of bounds.
 */
export function reverse<T>(
  array: T[],
  leftIndex?: number,
  rightIndex?: number
): void {
  // leftIndex 유효성검사
  if (leftIndex !== undefined && (leftIndex < 0 || leftIndex >= array.length)) {
    throw new Error('Invalid left index.');
  }

  // rightIndex 유효성검사
  if (rightIndex !== undefined && (rightIndex < 0 || rightIndex >= array.length)) {
    throw new Error('Invalid right index.');
  }

  let l = leftIndex !== undefined ? leftIndex : 0;
  let r = rightIndex !== undefined ? rightIndex : array.length - 1;

  while (l < r) {
    [array[l]!, array[r]!] = [array[r]!, array[l]!];
    l++;
    r--;
  }
}

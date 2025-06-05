import { intersect } from 'src/function';

describe('intersect', () => {
  it('should handle sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 4]);
    const result = intersect(set1, set2);
    expect(result).toEqual(new Set([2, 3]));
  });

  it('should handle arrays', () => {
    const array1 = [1, 2, 3];
    const array2 = [2, 3, 4];
    const result = intersect(array1, array2);
    expect(result).toEqual([2, 3]);
  });

  it('should handle empty', () => {
    const set1 = new Set();
    const set2 = new Set([1, 2, 3]);
    const result = intersect(set1, set2);
    expect(result).toEqual(new Set());

    const array1 = Array();
    const array2 = [1, 2, 3];
    const resultArray = intersect(array1, array2);
    expect(resultArray).toEqual([]);
  });

  it('should handle no intersect', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([4, 5, 6]);
    const result = intersect(set1, set2);
    expect(result).toEqual(new Set());
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const resultArray = intersect(array1, array2);
    expect(resultArray).toEqual([]);
  });

  it('should handle duplicates', () => {
    const set1 = new Set([1, 2, 2, 3]);
    const set2 = new Set([2, 3, 3, 4]);
    const result = intersect(set1, set2);
    expect(result).toEqual(new Set([2, 3]));

    const array1 = [1, 2, 2, 3];
    const array2 = [2, 2, 3, 3, 4];
    const resultArray = intersect(array1, array2);
    expect(resultArray).toEqual([2, 3]);
  });

  it('could allow duplicates in arrays', () => {
    const array1 = [1, 2, 2, 3];
    const array2 = [2, 2, 3, 3, 4];
    const resultArray = intersect(array1, array2, true);
    expect(resultArray).toEqual([2, 2, 3]);
  });
});
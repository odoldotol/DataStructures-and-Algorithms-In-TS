import { reverse } from 'src/function';

describe('reverse', () => {
  it('should reverse the entire array', () => {
    const arr = [1, 2, 3, 4, 5];
    reverse(arr);
    expect(arr).toEqual([5, 4, 3, 2, 1]);
  });

  it('should reverse a subarray', () => {
    const arr = [1, 2, 3, 4, 5];
    reverse(arr, 1, 3);
    expect(arr).toEqual([1, 4, 3, 2, 5]);

    reverse(arr, 2);
    expect(arr).toEqual([1, 4, 5, 2, 3]);

    reverse(arr, undefined, 2);
    expect(arr).toEqual([5, 4, 1, 2, 3]);
  });

  it('should handle empty arrays', () => {
    const arr: number[] = [];
    reverse(arr);
    expect(arr).toEqual([]);
  });

  it('should handle single element arrays', () => {
    const arr = [42];
    reverse(arr);
    expect(arr).toEqual([42]);
  });

  it('should throw an error for invalid left index', () => {
    const arr = [1, 2, 3];
    expect(() => reverse(arr, -1)).toThrow('Invalid left index.');
    expect(() => reverse(arr, 3)).toThrow('Invalid left index.');
  });

  it('should throw an error for invalid right index', () => {
    const arr = [1, 2, 3];
    expect(() => reverse(arr, undefined, -1)).toThrow('Invalid right index.');
    expect(() => reverse(arr, undefined, 3)).toThrow('Invalid right index.');
  });
});
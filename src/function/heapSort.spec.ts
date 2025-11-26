import { heapSort } from "src/function/heapSort";

describe("heapSort", () => {
  it("should sort an array of numbers in ascending order by default", () => {
    const array = [5, 3, 8, 1, 2, 7];
    const sortedArray = heapSort(array);
    expect(sortedArray === array).toBe(true); // In-place sort
    expect(sortedArray).toEqual([1, 2, 3, 5, 7, 8]);
  });

  it("should sort an array of numbers in descending order with custom comparator", () => {
    const array1 = [5, 3, 8, 1, 2, 7];
    const array2 = [5, 3, 8, 1, 2, 7];
    const descendingComparator = (a: number, b: number) => b - a;

    const expected = array1.sort(descendingComparator); // sort 와 사용과 결과가 같기를 기대함
    const sortedArray1 = heapSort(descendingComparator, array1);
    expect(sortedArray1 === array1).toBe(true);
    expect(expected).toEqual([8, 7, 5, 3, 2, 1]);

    const sortedArray = heapSort(descendingComparator, array2);
    expect(sortedArray === array2).toBe(true);
    expect(sortedArray).toEqual(expected);
  });
});
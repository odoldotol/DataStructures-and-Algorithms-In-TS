import { Heap } from "src/heap";

describe("MaxHeapSort", () => {
  it("should sort an array of numbers in descending order", () => {
    const array = [5, 3, 8, 1, 2, 7];
    const heap = Heap.max(array);
    const sortedArray = heap.sort();
    expect(sortedArray === array).toBe(true); // In-place sort
    expect(sortedArray).toEqual([8, 7, 5, 3, 2, 1]);
  });
});
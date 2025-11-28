import { HeapQueue } from "./heapQueue";

describe("HeapQueue", () => {

  describe("Constructor", () => {});

  describe("Static Methods", () => {});

  describe("Instance Methods", () => {

    describe("add", () => {});

    describe("poll", () => {});

    describe("replace", () => {
      it("should replace the root element and maintain heap property", () => {
        const heap = new HeapQueue([2,7,5,10,8,3]);
        const replaced = heap.replace(6);
        expect(replaced).toBe(2);
        expect(heap.peek()).toBe(3);
      });
    });
  });
});

describe("LeetCode", () => {

  describe("Top K-th Element using HeapQueue", () => {

    it("https://leetcode.com/explore/learn/card/heap/646/practices/4014/", () => {
      // Quickselect, Counting Sort 로 더 효율적인 풀이 가능
      const nums = [3,2,1,5,6,4];
      const k = 2;
      expect(findKthLargest(nums, k)).toBe(5);

      function findKthLargest(nums: number[], k: number): number {
        const minHeap = HeapQueue.min<number>();
        
        for (let i = 0; i < nums.length; i++) {
          if (minHeap.size() < k) {
            minHeap.add(nums[i]!);
          } else {
            if (nums[i]! > minHeap.peek()!) {
              minHeap.replace(nums[i]!);
            }
          }
        }
        
        return minHeap.peek()!;
      }
    });
  });

});
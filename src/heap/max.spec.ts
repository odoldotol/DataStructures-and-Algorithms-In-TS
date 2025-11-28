// @Todo - heapQueue.spec.ts 작성하고 제거

import { HeapQueue } from "./heapQueue";

describe("MaxHeap", () => {
  let maxHeap: HeapQueue<number>;

  beforeEach(() => {
    maxHeap = HeapQueue.max();
  });

  it("should initialize with an empty heap", () => {
    expect(maxHeap.size()).toBe(0);
    expect(maxHeap.isEmpty()).toBe(true);
  });

  it("should initialize with elements", () => {
    maxHeap = HeapQueue.max([5, 3, 8, 1]);
    expect(maxHeap.size()).toBe(4);
    expect(maxHeap.peek()).toBe(8);
  });

  it("should add elements and maintain heap property", () => {
    maxHeap.add(1);
    maxHeap.add(3);
    maxHeap.add(2);
    expect(maxHeap.size()).toBe(3);
    expect(maxHeap.isEmpty()).toBe(false);
  });

  it("should peek the top element without removing it", () => {
    maxHeap.add(1);
    maxHeap.add(3);
    maxHeap.add(2);
    expect(maxHeap.peek()).toBe(3);
    expect(maxHeap.size()).toBe(3); // size should remain the same
  });

  it("should poll the top element and maintain heap property", () => {
    maxHeap.add(1);
    maxHeap.add(3);
    maxHeap.add(2);
    expect(maxHeap.poll()).toBe(3);
    expect(maxHeap.peek()).toBe(2);
    expect(maxHeap.size()).toBe(2);
  });

  it("should handle polling from an empty heap", () => {
    expect(maxHeap.poll()).toBeNull();
  });

  it("should handle peeking into an empty heap", () => {
    expect(maxHeap.peek()).toBeNull();
  });
});

import { MinHeap } from "src/heap/min";

describe("MinHeap", () => {
  let minHeap: MinHeap<number>;

  beforeEach(() => {
    minHeap = new MinHeap<number>();
  });

  it("should initialize with an empty heap", () => {
    expect(minHeap.size()).toBe(0);
    expect(minHeap.isEmpty()).toBe(true);
  });

  it("should add elements and maintain heap property", () => {
    minHeap.add(3);
    minHeap.add(1);
    minHeap.add(2);
    expect(minHeap.size()).toBe(3);
    expect(minHeap.isEmpty()).toBe(false);
  });

  it("should peek the top element without removing it", () => {
    minHeap.add(3);
    minHeap.add(1);
    minHeap.add(2);
    expect(minHeap.peek()).toBe(1);
    expect(minHeap.size()).toBe(3); // size should remain the same
  });

  it("should poll the top element and maintain heap property", () => {
    minHeap.add(3);
    minHeap.add(1);
    minHeap.add(2);
    expect(minHeap.poll()).toBe(1);
    expect(minHeap.peek()).toBe(2);
    expect(minHeap.size()).toBe(2);
  });

  it("should handle polling from an empty heap", () => {
    expect(minHeap.poll()).toBeNull();
  });

  it("should handle peeking into an empty heap", () => {
    expect(minHeap.peek()).toBeNull();
  });
});

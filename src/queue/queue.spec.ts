import { Queue } from "src/queue";

describe("Queue", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it("should initialize with an empty queue", () => {
    expect(queue).toHaveLength(0);
  });

  it("should have length property", () => {
    expect(queue.length).toBeDefined();
  });

  it("enqueue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue).toHaveLength(2);
  });

  it("dequeue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue).toHaveLength(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue).toHaveLength(0);
  });

  it("should throw an error when dequeuing from an empty queue", () => {
    expect(() => queue.dequeue()).toThrow(RangeError);
  });

  it("hasAny", () => {
    expect(queue.hasAny()).toBe(false);
    queue.enqueue(1);
    expect(queue.hasAny()).toBe(true);
  });

  it("iterable in the order of insertion", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue[Symbol.iterator]()).toBeDefined();
    expect([...queue]).toEqual([1, 2]);
  });

  it("descendingIterator", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect([...queue.descendingIterator()]).toEqual([2, 1]);
  });
});
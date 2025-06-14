import { Stack } from "src/stack";

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it("should initialize with an empty stack", () => {
    expect(stack).toHaveLength(0);
  });

  it("should have length property", () => {
    expect(stack.length).toBeDefined();
  });

  it("push", () => {
    stack.push(1);
    stack.push(2);
    expect(stack).toHaveLength(2);
  });

  it("pop", () => {
    stack.push(1);
    stack.push(2);
    expect(stack).toHaveLength(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack).toHaveLength(0);
    expect(() => stack.pop()).toThrow(RangeError);
  });

  it("should throw an error when popping from an empty stack", () => {
    expect(() => stack.pop()).toThrow(RangeError);
  });

  it("hasAny", () => {
    expect(stack.hasAny()).toBe(false);
    stack.push(1);
    expect(stack.hasAny()).toBe(true);
  });

  it("iterable in the order of pop", () => {
    stack.push(1);
    stack.push(2);
    expect(stack[Symbol.iterator]()).toBeDefined();
    expect([...stack]).toEqual([2, 1]);
  });

  it("descendingIterator", () => {
    stack.push(1);
    stack.push(2);
    expect([...stack.descendingIterator()]).toEqual([1, 2]);
  });
});
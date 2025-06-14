export class Stack<T>
  implements Iterable<T>
{
  private readonly items: T[] = [];

  constructor() {}

  // peek(): T
  // search(item: T): number

  public get length(): number {
    return this.items.length;
  }

  public hasAny(): boolean {
    return this.items.length > 0;
  }

  public push(item: T): void {
    this.items.push(item);
  }

  /**
   * @throws {RangeError} if the stack is empty.
   */
  public pop(): T {
    if (this.hasAny() === false) {
      throw new RangeError("Stack is empty");
    }
    return this.items.pop()!;
  }

  /**
   * push 순서가 아닌 pop 순서대로 순회하는 이터레이터를 반환합니다.
   */
  public *[Symbol.iterator](): IterableIterator<T> {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i]!;
    }
  }
  /**
   * push 순서대로 순회하는 이터레이터를 반환합니다.
   */
  public descendingIterator(): IterableIterator<T> {
    return this.items[Symbol.iterator]();
  }

}

import { DoublyLinkedList } from "src/linkedList";

export class Queue<T>
  implements Iterable<T>
{
  private readonly items = new DoublyLinkedList<T>(); // SinglyLinkedList 로도 충분

  constructor() {}

  public get length(): number {
    return this.items.length;
  }

  public hasAny(): boolean {
    return this.items.length > 0;
  }

  public enqueue(item: T): void {
    this.items.addAtTail(item);
  }

  /**
   * @throws {RangeError} If the queue is empty.
   */
  public dequeue(): T {
    return this.items.removeAtHead();
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.items[Symbol.iterator]();
  }

  public descendingIterator(): IterableIterator<T> {
    return this.items.descendingIterator();
  }

}

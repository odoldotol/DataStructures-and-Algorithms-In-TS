import {
  DoublyNode,
  NodeFactory
} from "../common";

/**
 * 
 */
export class DoublyLinkedList<T>
  implements Iterable<T>
{
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private _length: number = 0;

  constructor() {}

  public get length(): number {
    return this._length;
  }

  // add 나 remove 에 트랜젝션개념 도입 필요할까? <-> 에러체크 먼저 하고 무조건 끝까지 성공할 거라고 확신하는 구현
  // add, remove 매서드들을 2개 이상의 아이템 다루도록 개선?

  // public clear(): void
  // public includes(item: T): boolean
  // public getHead(): T
  // public getTail(): T
  // public indexOf(item: T): number
  // public lastIndexOf(item: T): number
  // public set(index: number, item: T): void
  // public removeFirstOccurrence(item: T): number
  // public removeLastOccurrence(item: T): number
  // public removeAll(item: T): number
  // public toArray(): T[]

  /**
   * @throws RangeError if index is out of bounds
   */
  public get(index: number): T {
    return this.getNode(index).value;
  }

  public addAtHead(item: T): void {
    const newNode = NodeFactory.createDoubly<T>(item);

    if (this.head !== null) {
      newNode.next = this.head;
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }

    this.head = newNode;
    this.increaseLength();
  }

  /**
   * This method is equivalent to `add`.
   */
  public addAtTail(item: T): void {
    const newNode = NodeFactory.createDoubly<T>(item);

    if (this.tail !== null) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.increaseLength();
  }

  /**
   * This method is equivalent to `addAtTail`.
   */
  public add(item: T): void {
    return this.addAtTail(item);
  }

  /**
   * @throws RangeError if index is out of bounds
   */
  public addAtIndex(
    index: number,
    item: T
  ): void {
    if (index === 0) {
      this.addAtHead(item);
    } else if (index === this._length) {
      this.addAtTail(item);
    } else if (index > 0 && index < this._length) {
      const pre = this.getNode(index - 1);
      const newNode = NodeFactory.createDoubly<T>(item);
      const next = pre.next;

      if (next !== null) {
        newNode.next = next;
        next.prev = newNode;
      }

      pre.next = newNode;
      newNode.prev = pre;
      this.increaseLength();
    } else {
      throw this.indexOutOfBounds();
    }
  }

  /**
   * @throws RangeError if has no elements
   */
  public removeAtHead(): T {
    if (this.head === null) {
      throw this.indexOutOfBounds();
    }

    this.decreaseLength();

    const removedNode = this.head;
    this.head = this.head.next;

    if (this.head !== null) {
      this.head.prev = null;
    }

    if (this.tail === removedNode) {
      this.tail = null;
    }

    return removedNode.value;
  }

  /**
   * @throws RangeError if has no elements
   */
  public removeAtTail(): T {
    if (this.tail === null) {
      throw this.indexOutOfBounds();
    }

    this.decreaseLength();

    const removedNode = this.tail;
    this.tail = this.tail.prev;

    if (this.tail !== null) {
      this.tail.next = null;
    }

    if (this.head === removedNode) {
      this.head = null;
    }

    return removedNode.value;
  }

  public removeAtIndex(index: number): void {
    if (index === 0) {
      this.removeAtHead();
    } else if (index === this._length - 1) {
      this.removeAtTail();
    } else if (index > 0 && index < this._length - 1) {
      const removedNode = this.getNode(index);
      this.decreaseLength();
      const prev = removedNode.prev;
      const next = removedNode.next;

      if (prev !== null) {
        prev.next = next;
      }

      if (next !== null) {
        next.prev = prev;
      }
    } else {
      throw this.indexOutOfBounds();
    }
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    if (this.head) {
      yield* this.head[Symbol.iterator]();
    }
  }

  public *descendingIterator(): IterableIterator<T> {
    if (this.tail) {
      yield* this.tail.descendingIterator();
    }
  }

  private getNode(index: number): DoublyNode<T> {
    if (index < 0 || index >= this.length) {
      throw this.indexOutOfBounds();
    }

    if (index < this.length / 2) {
      return this.getNodeByStepFromHeadOrTail(index, true);
    } else {
      return this.getNodeByStepFromHeadOrTail(this.length - index - 1, false);
    }
  }

  private getNodeByStepFromHeadOrTail(
    step: number,
    fromHead: boolean = true
  ): DoublyNode<T> {
    let pointer = fromHead ? this.head : this.tail;

    if (pointer !== null) {
      const nextKey = fromHead ? "next" : "prev";
      
      let next: DoublyNode<T> | null;
      let i = 0;
      while (
        i < step &&
        (next = pointer[nextKey]) !== null
      ) {
        pointer = next;
        i++;
      }

      if (i === step) {
        return pointer;
      }
    }

    throw this.indexOutOfBounds();
  }

  private increaseLength(): number {
    return ++this._length;
  }

  /**
   * @throws RangeError if index is out of bounds
   */
  private decreaseLength(): number {
    if (this._length === 0) {
      throw this.indexOutOfBounds();
    }

    return --this._length;
  }

  private indexOutOfBounds(): RangeError {
    return new RangeError("Index out of bounds");
  }

}

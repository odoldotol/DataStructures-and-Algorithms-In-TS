import { SinglyLinkedListNode } from "./singly";

export class DoublyLinkedListNode<T>
  extends SinglyLinkedListNode<T>
{
  protected override _next: DoublyLinkedListNode<T> | null;
  private _prev: DoublyLinkedListNode<T> | null;

  constructor(
    value: T,
    nextNode: DoublyLinkedListNode<T> | null = null,
    prevNode: DoublyLinkedListNode<T> | null = null
  ) {
    super(value, nextNode);
    this._next = nextNode;
    this._prev = prevNode;
  }

  public override get next(): DoublyLinkedListNode<T> | null {
    return this._next;
  }

  public override set next(nextNode: DoublyLinkedListNode<T> | null) {
    this._next = nextNode;
  }

  public get prev(): DoublyLinkedListNode<T> | null {
    return this._prev;
  }

  public set prev(prevNode: DoublyLinkedListNode<T> | null) {
    this._prev = prevNode;
  }

  public *descendingIterator(): IterableIterator<T> {
    let currentNode: DoublyLinkedListNode<T> | null = this;
    while (currentNode !== null) {
      yield currentNode.value;
      currentNode = currentNode.prev;
    }
  }

}

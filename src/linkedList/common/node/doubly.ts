import { SinglyLinkedListNode } from "./singly";

export class DoublyLinkedListNode<T>
  extends SinglyLinkedListNode<T>
{
  protected override next: DoublyLinkedListNode<T> | null;
  private prev: DoublyLinkedListNode<T> | null;

  constructor(
    value: T,
    nextNode: DoublyLinkedListNode<T> | null = null,
    prevNode: DoublyLinkedListNode<T> | null = null
  ) {
    super(value, nextNode);
    this.next = nextNode;
    this.prev = prevNode;
  }

  public override getNext(): DoublyLinkedListNode<T> | null {
    return this.next;
  }

  public override setNext(nextNode: DoublyLinkedListNode<T> | null): void {
    this.next = nextNode;
  }

  public getPrev(): DoublyLinkedListNode<T> | null {
    return this.prev;
  }

  public setPrev(prevNode: DoublyLinkedListNode<T> | null): void {
    this.prev = prevNode;
  }

  public *descendingIterator(): IterableIterator<T> {
    let currentNode: DoublyLinkedListNode<T> | null = this;
    while (currentNode !== null) {
      yield currentNode.getValue();
      currentNode = currentNode.prev;
    }
  }

}

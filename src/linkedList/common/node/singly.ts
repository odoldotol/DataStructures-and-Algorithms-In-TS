import { Node } from "src/common";

/**
 * 노드를 직접 꺼내서 편집할 수 있는 완전 자유로운 버전의 연결리스트에서 각 노드에서 이터레이터를 뽑아쓸 수 있으면 좋을것 같아서 이터러블로 구현함. 문제될시 제거하기.
 */
export class SinglyLinkedListNode<T>
  extends Node<T>
  implements Iterable<T>
{
  protected next: SinglyLinkedListNode<T> | null;

  constructor(
    value: T,
    nextNode: SinglyLinkedListNode<T> | null = null
  ) {
    super(value);
    this.next = nextNode;
  }

  public getNext(): SinglyLinkedListNode<T> | null {
    return this.next;
  }

  public setNext(nextNode: SinglyLinkedListNode<T> | null): void {
    this.next = nextNode;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let currentNode: SinglyLinkedListNode<T> | null = this;
    while (currentNode !== null) {
      yield currentNode.getValue();
      currentNode = currentNode.next;
    }
  }
}

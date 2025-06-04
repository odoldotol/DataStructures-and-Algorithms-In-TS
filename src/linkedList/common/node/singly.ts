/**
 * 노드를 직접 꺼내서 편집할 수 있는 완전 자유로운 버전의 연결리스트에서 각 노드에서 이터레이터를 뽑아쓸 수 있으면 좋을것 같아서 이터러블로 구현함. 문제될시 제거하기.
 */
export class SinglyLinkedListNode<T>
  implements Iterable<T>
{
  private _value: T;
  protected _next: SinglyLinkedListNode<T> | null;

  constructor(
    value: T,
    nextNode: SinglyLinkedListNode<T> | null = null
  ) {
    this._value = value;
    this._next = nextNode;
  }

  public get value(): T {
    return this._value;
  }

  public get next(): SinglyLinkedListNode<T> | null {
    return this._next;
  }

  public set next(nextNode: SinglyLinkedListNode<T> | null) {
    this._next = nextNode;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let currentNode: SinglyLinkedListNode<T> | null = this;
    while (currentNode !== null) {
      yield currentNode.value;
      currentNode = currentNode.next;
    }
  }

}

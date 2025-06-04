import { DoublyLinkedListNode } from "./doubly";
import { SinglyLinkedListNode } from "./singly";

class LinkedListNodeFactoryStatic {

  public createSingly<T>(value: T): SinglyLinkedListNode<T> {
    return new SinglyLinkedListNode<T>(value);
  }

  public createDoubly<T>(value: T): DoublyLinkedListNode<T> {
    return new DoublyLinkedListNode<T>(value);
  }

}

export const NodeFactory = new LinkedListNodeFactoryStatic();
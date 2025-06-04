import { DoublyLinkedListNode } from './doubly';
import { SinglyLinkedListNode } from './singly';

export * from './factory';

export type SinglyNode<T> = SinglyLinkedListNode<T>;
export type DoublyNode<T> = DoublyLinkedListNode<T>;
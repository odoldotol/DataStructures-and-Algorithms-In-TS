import { Queue } from "src/queue";
import { BinaryTreeNode } from "./node";

export function levelOrderTraversal<T>(root: BinaryTreeNode<T> | null): T[][] {
  const result: T[][] = [];
  if (!root) return result;

  const queue = new Queue<BinaryTreeNode<T> | null>();
  queue.enqueue(root);

  while (queue.length > 0) {
    const level: T[] = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue()!;
      level.push(current.getValue());

      if (current.getLeft()) {
        queue.enqueue(current.getLeft()!);
      }
      if (current.getRight()) {
        queue.enqueue(current.getRight()!);
      }
    }

    result.push(level);
  }

  return result;
}

// Top-Down

import { BinaryTreeNode } from "./node";

export function preorderTraversal<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  if (root) {
    result.push(root.getValue());
    result.push(...preorderTraversal(root.getLeft()));
    result.push(...preorderTraversal(root.getRight()));
  }
  return result;
}

export function preorderTraversalIteratively<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  const stack: (BinaryTreeNode<T> | null)[] = [root];

  while (stack.length > 0) {
    const current = stack.pop() as BinaryTreeNode<T> | null;
    if (current) {
      result.push(current.getValue());
      stack.push(current.getRight());
      stack.push(current.getLeft());
    }
  }

  return result;
}

export function preorderTraversalRecursive<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  function traverse(node: BinaryTreeNode<T> | null) {
    if (node) {
      result.push(node.getValue());
      traverse(node.getLeft());
      traverse(node.getRight());
    }
  }
  traverse(root);
  return result;
}

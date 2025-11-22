// Bottom-Up

import { BinaryTreeNode } from "./node";

export function postorderTraversal<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  if (root) {
    result.push(...postorderTraversal(root.getLeft()));
    result.push(...postorderTraversal(root.getRight()));
    result.push(root.getValue());
  }
  return result;
}

export function postorderTraversalIteratively<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  const stack: (BinaryTreeNode<T> | null)[] = [];
  let current: BinaryTreeNode<T> | null = root;
  let lastVisited: BinaryTreeNode<T> | null = null;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.getLeft();
    }
    current = stack[stack.length - 1]!;

    if (!current.getRight() || current.getRight() === lastVisited) {
      result.push(current.getValue());
      lastVisited = current;
      stack.pop();
      current = null; // Reset current to null to continue with the stack
    } else {
      current = current.getRight();
    }
  }

  return result;
}

export function postorderTraversalRecursive<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  function traverse(node: BinaryTreeNode<T> | null) {
    if (node) {
      traverse(node.getLeft());
      traverse(node.getRight());
      result.push(node.getValue());
    }
  }
  traverse(root);
  return result;
}
import { BinaryTreeNode } from "./node";

export function inorderTraversal<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  if (root) {
    result.push(...inorderTraversal(root.getLeft()));
    result.push(root.getValue());
    result.push(...inorderTraversal(root.getRight()));
  }
  return result;
}

export function inorderTraversalIteratively<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  const stack: (BinaryTreeNode<T> | null)[] = [];
  let current: BinaryTreeNode<T> | null = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.getLeft();
    }
    current = stack.pop() as BinaryTreeNode<T> | null;
    if (current) {
      result.push(current.getValue());
      current = current.getRight();
    }
  }

  return result;
}

export function inorderTraversalRecursive<T>(root: BinaryTreeNode<T> | null): T[] {
  const result: T[] = [];
  function traverse(node: BinaryTreeNode<T> | null) {
    if (node) {
      traverse(node.getLeft());
      result.push(node.getValue());
      traverse(node.getRight());
    }
  }
  traverse(root);
  return result;
}

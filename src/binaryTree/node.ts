import { Node } from "src/common";

export class BinaryTreeNode<T>
  extends Node<T>
{
  constructor(
    value: T,
    protected left: BinaryTreeNode<T> | null = null,
    protected right: BinaryTreeNode<T> | null = null
  ) {
    super(value);
  }

  public getLeft(): BinaryTreeNode<T> | null {
    return this.left;
  }

  public setLeft(leftNode: BinaryTreeNode<T> | null): void {
    this.left = leftNode;
  }

  public getRight(): BinaryTreeNode<T> | null {
    return this.right;
  }

  public setRight(rightNode: BinaryTreeNode<T> | null): void {
    this.right = rightNode;
  }
}

/**
 * 다이나믹어레이 기반 \
 * 추가만 가능 \
 * @Todo index 는 positive integer 만 들어온다고 가정하고 있음. 위험함.
 */
export class CompleteBinaryTreeArray<T> {
  protected tree = Array<T>(1); // tree[0] empty

  public size(): number {
    return this.tree.length - 1;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @param value 
   * @returns size
   */
  public add(value: T): number {
    return this.tree.push(value) - 1;
  }

  public peek(): T | null {
    return this.tree[1] ?? null;
  }

  /**
   * return 0 if root
   */
  protected getParentIndex(index: number): number {
    return Math.floor(index / 2);
  }

  /**
   * 사이즈 검사 안함
   */
  protected getLeftChildIndex(index: number): number {
    return index * 2;
  }

  /**
   * 사이즈 검사 안함
   */
  protected getRightChildIndex(index: number): number {
    return this.getLeftChildIndex(index) + 1;
  }

  protected isLeaf(index: number): boolean {
    return this.getParentIndex(this.size()) < index;
    // return this.getLeftChildIndex(index) > this.size();
  }
}

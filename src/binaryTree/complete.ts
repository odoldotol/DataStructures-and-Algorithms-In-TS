/**
 * 다이나믹어레이 기반 \
 * 추가만 가능 \
 * @Todo index 는 positive integer 만 들어온다고 가정하고 있음. 위험함.
 */
export class CompleteBinaryTreeArray<T> {
  protected treeArr: T[];
  protected treeSize: number;

  constructor();
  constructor(array: T[]);
  constructor(
    array: T[] = []
  ) {
    this.treeArr = array;
    this.treeSize = array.length;
  }

  public size(): number {
    return this.treeSize;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @param value 
   * @returns size
   */
  public add(value: T): number {
    this.treeArr[this.treeSize] = value;
    return ++this.treeSize;
  }

  public peek(): T | null {
    return this.treeArr[0] ?? null;
  }

  /**
   * return 0 if root
   */
  protected getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * 사이즈 검사 안함
   */
  protected getLeftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  /**
   * 사이즈 검사 안함
   */
  protected getRightChildIndex(index: number): number {
    return index * 2 + 2;
  }

  protected isLeaf(index: number): boolean {
    return this.getLeftChildIndex(index) >= this.size();
  }
}

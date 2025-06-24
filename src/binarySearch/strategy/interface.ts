export type BinarySearchStrategyOptions<T> = Partial<BinarySearchWithTargetStrategy<T> & BinarySearchWithNoTargetStrategy<T>>;

interface BinarySearchStrategy<T>
{
  /**
   * @returns a comparable to compare with the target.
   */
  makeIndexComparable(index: number): T;

  /**
   * @returns if leftOne is in the left side of rightOne.
   */
  compare(leftOne: T, rightOne: T): boolean;

  isEqual(a: T, b: T): boolean;
}

export interface BinarySearchWithTargetStrategy<T>
  extends BinarySearchStrategy<T>
{
  isTargetInLeftSide(comparable: T, target: T, compareFn: (leftOne: T, rightOne: T) => boolean): boolean;

  isTarget(comparable: T, target: T, isEqualFn: (a: T, b: T) => boolean): boolean;
}

export interface BinarySearchWithNoTargetStrategy<T>
extends BinarySearchStrategy<T>
{
  isNextSearchLeftSide(comparable: T): boolean;
}

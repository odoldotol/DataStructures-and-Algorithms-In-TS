import {
  makeIndexComparable,
  compare,
  isEqual,
  calculateMidIndex
} from './default';

export type BinarySearchStrategyOptions<T> = Partial<BinarySearchStrategy<T>>;

export interface BinarySearchStrategy<T> {

  makeIndexComparable(index: number): T;

  /**
   * @returns if leftOne is in the left side of rightOne.
   */
  compare(leftOne: T, rightOne: T): boolean;

  isEqual(a: T, b: T): boolean;

  calculateMidIndex(leftIndex: number, rightIndex: number): number;

}

export const createDefault = <T>(): BinarySearchStrategy<T> => ({
  makeIndexComparable,
  compare,
  isEqual,
  calculateMidIndex
});
import {
  makeIndexComparable,
  compare,
  isEqual,
  isTargetInLeftSide,
  isTarget,
} from './default';
import {
  BinarySearchWithNoTargetStrategy,
  BinarySearchWithTargetStrategy,
  BinarySearchStrategyOptions,
} from './interface';

class BinarySearchStrategyFactoryStatic {
  public createWithTarget<T>(
    options: BinarySearchStrategyOptions<T>
  ): BinarySearchWithTargetStrategy<T> {
    return {
      makeIndexComparable: options.makeIndexComparable ?? makeIndexComparable,
      isTargetInLeftSide: options.isTargetInLeftSide ?? isTargetInLeftSide,
      isTarget: options.isTarget ?? isTarget,
      compare: options.compare ?? compare,
      isEqual: options.isEqual ?? isEqual,
    };
  }

  public createWithNoTarget<T>(
    options: BinarySearchStrategyOptions<T>
  ): BinarySearchWithNoTargetStrategy<T> {
    if (options.isNextSearchLeftSide === undefined) {
      throw new Error('isNextSearchLeftSide must be defined for BinarySearchWithNoTargetStrategy');
    }

    return {
      makeIndexComparable: options.makeIndexComparable ?? makeIndexComparable,
      isNextSearchLeftSide: options.isNextSearchLeftSide,
      compare: options.compare ?? compare,
      isEqual: options.isEqual ?? isEqual,
    };
  }
}

export const BinarySearchStrategyFactory = new BinarySearchStrategyFactoryStatic();
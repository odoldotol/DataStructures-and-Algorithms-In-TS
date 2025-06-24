import { BinarySearchBuilder } from "./buider";
import { BinarySearch } from "./common";

class BinarySearchFactoryStatic {
  public createBuilder<T>(): BinarySearchBuilder<T>;
  public createBuilder<T>(leftIndex: number, rightIndex: number, target: T): BinarySearchBuilder<T>;
  public createBuilder<T>(
    min?: number,
    max?: number,
    target?: T
  ): BinarySearchBuilder<T> {
    if (min !== undefined && max !== undefined && target !== undefined) {
      return new BinarySearchBuilder<T>()
      .setRange(min, max)
      .setTarget(target);
    } else if (min === undefined && max === undefined && target === undefined) {
      return new BinarySearchBuilder<T>();
    } else {
      throw new TypeError('Invalid parameters for BinarySearchFactory.createBuilder');
    }
  }

  public createNoTargetBuilder<T>(
    leftIndex: number,
    rightIndex: number,
    isNextSearchLeftSide: (comparable: T) => boolean
  ): BinarySearchBuilder<T> {
    return new BinarySearchBuilder<T>()
    .setRange(leftIndex, rightIndex)
    .setStrategy({ isNextSearchLeftSide });
  }

  public createOnArray<T>(
    array: T[],
    target: T
  ): BinarySearch {
    if (Array.isArray(array) === false) {
      throw new TypeError('Invalid array.');
    }

    if (array.length === 0) {
      throw new Error('Array is empty.');
    }

    return new BinarySearchBuilder<T>()
    .setRange(0, array.length - 1)
    .setTarget(target)
    .setStrategy({ makeIndexComparable: index => array[index]! })
    .build();
  }

}

export const BinarySearchFactory = new BinarySearchFactoryStatic();
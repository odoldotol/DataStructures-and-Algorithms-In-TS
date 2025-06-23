import { BinarySearch } from "./binarySearch";
import { BinarySearchBuilder } from "./buider";

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
    }

    return new BinarySearchBuilder<T>();
  }

  public createOnArray<T>(
    array: T[],
    target: T
  ): BinarySearch<T> {
    if (Array.isArray(array) === false) {
      throw new TypeError('Invalid array.');
    }

    if (array.length === 0) {
      throw new Error('Array is empty.');
    }

    return new BinarySearchBuilder<T>()
    .setLeftIndex(0)
    .setRightIndex(array.length - 1)
    .setTarget(target)
    .setStrategy({ makeIndexComparable: index => array[index]! })
    .build();
  }

}

export const BinarySearchFactory = new BinarySearchFactoryStatic();
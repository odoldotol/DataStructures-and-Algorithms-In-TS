import { BinarySearch } from "./common";
import {
  BinarySearchStrategyOptions,
  BinarySearchStrategyFactory,
} from "./strategy";
import { BinarySearchWithNoTarget } from "./withNoTarget";
import { BinarySearchWithTarget } from "./withTarget";

export class BinarySearchBuilder<T> {

  private leftIndex = NaN;
  private rightIndex = NaN;
  private target: T | undefined;
  private strategy: BinarySearchStrategyOptions<T> = {};

  public setLeftIndex(index: number): this {
    this.leftIndex = index;
    return this;
  }

  public setRightIndex(index: number): this {
    this.rightIndex = index;
    return this;
  }

  public setRange(
    leftIndex: number,
    rightIndex: number
  ): this {
    this.setLeftIndex(leftIndex);
    this.setRightIndex(rightIndex);
    return this;
  }

  public setTarget(
    target: T
  ): this {
    this.target = target;
    return this;
  }

  public setStrategy(
    strategyOptions: BinarySearchStrategyOptions<T>
  ): this {
    this.strategy = Object.assign(this.strategy, strategyOptions);
    return this;
  }

  public build(): BinarySearch {
    if (this.target === undefined) {
      return new BinarySearchWithNoTarget<T>(
        ...this.validateIndices(),
        BinarySearchStrategyFactory.createWithNoTarget(this.strategy),
      );
    } else {
      return new BinarySearchWithTarget<T>(
        ...this.validateIndices(),
        BinarySearchStrategyFactory.createWithTarget(this.strategy),
        this.target,
      );
    }
  }

  private validateIndices(): [number, number] {
    if (
      Number.isFinite(this.leftIndex) === false ||
      Number.isFinite(this.rightIndex) === false
    ) {
      throw new Error('invalid left or right index.');
    }

    if (this.rightIndex < this.leftIndex) {
      throw new RangeError('Right index is less than left index.');
    }

    return [this.leftIndex, this.rightIndex];
  }

}

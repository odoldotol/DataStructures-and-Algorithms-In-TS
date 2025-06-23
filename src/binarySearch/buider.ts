import { BinarySearch } from "./binarySearch";
import {
  BinarySearchStrategyOptions,
  createDefault
} from "./strategy";

export class BinarySearchBuilder<T> {

  private leftIndex = NaN;
  private rightIndex = NaN;

  private target: T | undefined;

  private readonly strategy = createDefault<T>();

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
    Object.assign(this.strategy, strategyOptions);
    return this;
  }

  public build(): BinarySearch<T> {
    return new BinarySearch<T>(
      ...this.validateIndices(),
      this.validateTarget(),
      this.strategy
    );
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

  private validateTarget(): T {
    if (this.target === undefined) {
      throw new Error('Target is not set.');
    }

    return this.target;
  }

}

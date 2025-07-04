export class Node<T>
{
  constructor(
    private readonly value: T
  ) {}

  public getValue(): T {
    return this.value;
  }
}

export const isPositiveInteger = (number: number): boolean => {
  return number >= 0 && Number.isInteger(number);
}
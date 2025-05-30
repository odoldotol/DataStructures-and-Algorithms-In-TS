/*
Todo - 2개 이상의 개체를 다루기

- 개체의 총 갯수를 고려하여 가장 사이즈가 작은 개체를 기준으로 삼는 알고리즘 고려하기
*/

// export function intersection<T>(
//   set: Set<T>,
//   ...sets: Set<T>[]
// ): Set<T>;
// export function intersection<T>(
//   array: T[],
//   ...arrays: T[][]
// ): T[];
export function intersection<T>(
  set1: Set<T>,
  set2: Set<T>,
): Set<T>;
export function intersection<T>(
  array1: T[],
  array2: T[],
): T[];
export function intersection<T>(
  arg1: Set<T> | T[],
  arg2: Set<T> | T[],
): Set<T> | T[] {
  if (arg1 instanceof Set && arg2 instanceof Set) {
    return intersectionSet(arg1, arg2);
  } else if (Array.isArray(arg1) && Array.isArray(arg2)) {
    return intersectionArray(arg1, arg2);
  } else {
    throw new TypeError('Both arguments must be either Sets or Arrays of the same type.');
  }
}

// export function intersectionSet<T>(
//   set: Set<T>,
//   ...sets: Set<T>[]
// ): Set<T>;
function intersectionSet<T>(
  set1: Set<T>,
  set2: Set<T>,
): Set<T> {
  if (set1.size > set2.size) {
    [set1, set2] = [set2, set1];
  }

  const result = new Set<T>();

  for (const item of set1) {
    if (set2.has(item)) {
      result.add(item);
    }
  }

  return result;
}

// export function intersectionArray<T>(
//   array: T[],
//   ...arrays: T[][]
// ): T[];
function intersectionArray<T>(
  array1: T[],
  array2: T[],
): T[] {
  let set1 = new Set(array1);
  let set2 = new Set(array2);

  if (set1.size > set2.size) {
    [set1, set2] = [set2, set1];
  }

  return Array.from(set1).filter(item => set2.has(item));
}

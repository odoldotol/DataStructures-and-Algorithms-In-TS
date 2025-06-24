import { BinarySearchFactory } from "./factory";

describe('BinarySearch', () => {

  describe('LeetCode', () => {
    /*
    LeetCode binary-search card 를 학습하며 각 예제들을 케이스로 일반화 진행함.
    각 예제들을 이 구현체로 해결했을때 성능상 유의미한 패널티가 없도록 함.
    이슈는 각 케이스에 기록.
    */

    it('https://leetcode.com/explore/learn/card/binary-search/138/background/1038/', () => {
      const nums = [-1,0,3,5,9,12];
      const target = 9;
      expect(search(nums, target)).toBe(4);

      function search(nums: number[], target: number): number {
        const result = BinarySearchFactory
        .createOnArray(nums, target)
        .run()
        .getMidIndex();
        
        return Number.isNaN(result) ? -1 : result;
      }
    });

    it('https://leetcode.com/explore/learn/card/binary-search/125/template-i/950/', () => {
      /*
      성능에서 이슈가 있음.
      논리적으로 전개가 동일한 아래와 같은 함수에서는 문제 없음.
      때문에 일단 넘어가나, 추후 탐구해볼것.

      function mySqrt(x: number): number {
        let left = 1;
        let right = x;

        while (left <= right) {
          const mid = Math.floor(left + (right - left) / 2);
          const squared = mid * mid;

          if (squared === x) {
            return mid;
          } else if (squared < x) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }

        return right;
      };

      */

      const x = 4;
      expect(mySqrt(x)).toBe(2);

      function mySqrt(x: number): number {
        const binarySearch = BinarySearchFactory
        .createBuilder(0, x, x)
        .setStrategy({ makeIndexComparable: index => index * index })
        .build()
        .run();

        const result = binarySearch.getMidIndex();

        return Number.isNaN(result) ? binarySearch.getRightIndex() : result;
      }
    });

    it('https://leetcode.com/explore/learn/card/binary-search/125/template-i/951/', () => {
      const pick = 6;
      const n = 10;

      expect(guessNumber(n)).toBe(pick);

      function guessNumber(n: number): number {
        return BinarySearchFactory
        .createBuilder(1, n, 0)
        .setStrategy({
          makeIndexComparable: guess,
          compare: (leftOne, rightOne) => leftOne > rightOne,
        })
        .build()
        .run()
        .getMidIndex();
      }

      /** 
       * Forward declaration of guess API.
       * @param {number} num   your guess
       * @return 	     -1 if num is higher than the picked number
       *			      1 if num is lower than the picked number
       *               otherwise return 0
       * var guess = function(num) {}
       */
      function guess(num: number): number {
        if (num === pick) {
          return 0;
        } else if (pick < num) {
          return -1;
        } else {
          return 1;
        }
      }
    });

    it('https://leetcode.com/explore/learn/card/binary-search/125/template-i/952/', () => {
      const nums = [4,5,6,7,0,1,2];
      const target = 0;
      expect(search(nums, target)).toBe(4);

      function search(
        nums: number[],
        target: number
      ): number {
        // const first = 0 번째 요소의 값;
        // const last = length-1 번쨰 요소의 값;
        // target 이 last 보다 같거나 작다면 후번부에 위치. last 보다 크다면 전면부에 위치.
        // 마찬가지로 i 번째 요소의 값이 last 보다 같거나 작다면 i 는 후번부에 위치. last 보다 크다면 i 는 전면부에 위치.
        // 이진탐색시 i 가 전면부에 위치하는지 후면부에 위치하는지 먼저 판단하고
          // 타겟과 다른섹션이라면 바로 range 를 수정.
          // 타겟과 같은섹션이라면 대소비교를 통해 range 를 수정.
        
        const first = nums[0]!;
        const last = nums[nums.length - 1]!;
        
        const isRotated = first > last;

        let result: number;
        if (isRotated === false) {
          result = BinarySearchFactory
          .createOnArray(nums, target)
          .run()
          .getMidIndex();
        } else {
          const isTargetInLastSection = target <= last;

          result = BinarySearchFactory
          .createBuilder(0, nums.length - 1, target)
          .setStrategy({
            makeIndexComparable: index => nums[index]!,
            isTargetInLeftSide: (comparable, target, compareFn) => {
              const isComparableInLastSection = comparable <= last;
              if (isComparableInLastSection === isTargetInLastSection) {
                return compareFn(target, comparable);
              } else if (isTargetInLastSection === false) {
                return true;
              } else {
                return false;
              }
            }
          })
          .build()
          .run()
          .getMidIndex();
        }

        return Number.isNaN(result) ? -1 : result;
      }
    });

    it('https://leetcode.com/explore/learn/card/binary-search/126/template-ii/947/', () => {
      const n = 5;
      const isBadVersion = (version: number): boolean => {
        return version >= 4;
      };

      expect(solution(isBadVersion)(n)).toBe(4);

      function solution(isBadVersion: any) {
          return function(n: number): number {
            return BinarySearchFactory
            .createNoTargetBuilder(1, n, comparable => isBadVersion(comparable))
            .build()
            .run()
            .getLeftIndex();
          };
      };
    });

  });
});

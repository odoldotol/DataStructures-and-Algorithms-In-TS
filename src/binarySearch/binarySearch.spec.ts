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
      const binarySearch = BinarySearchFactory.createOnArray(nums, target);
      const result = binarySearch.run();
      expect(result).toBe(4);
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
      const binarySearch = BinarySearchFactory
      .createBuilder(0, x, x)
      .setStrategy({ makeIndexComparable: index => index * index })
      .build();

      const result = binarySearch.run();

      if (Number.isNaN(result)) {
        expect(binarySearch.getRightIndex()).toBe(2);
      }

      expect(result).toBe(2);
    });

    it('https://leetcode.com/explore/learn/card/binary-search/125/template-i/951/', () => {
      const n = 10;
      const pick = 6;

      const guess = (num: number): number => {
        if (num === pick) {
          return 0;
        } else if (pick < num) {
          return -1;
        } else {
          return 1;
        }
      };

      const result = BinarySearchFactory
      .createBuilder(1, n, 0)
      .setStrategy({
        makeIndexComparable: guess,
        compare: (leftOne, rightOne) => leftOne > rightOne,
      })
      .build()
      .run();

      expect(result).toBe(pick);
    });

  });
});

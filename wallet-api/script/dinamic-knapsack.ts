import { TRANSACTIONS_TEST_ARR } from './TRANSACTIONS_TEST_ARR';
import { Logger } from '@nestjs/common';

class Knapsack {
  // Returns the selected indexes so that maximum value that can be put in a knapsack of capacity W
  static knapSack(maxWeight: number, weightArr: number[], valueArr: number[], n: number) {
    let i, w;
    const K = Array(n + 1)
      .fill(0)
      .map(() => Array(maxWeight + 1).fill(0));

    // Build table K[][] in bottom up manner
    for (i = 1; i <= n; i++) {
      for (w = 0; w <= maxWeight; w++) {
        if (weightArr[i - 1] <= w) {
          K[i][w] = Math.max(valueArr[i - 1] + K[i - 1][w - weightArr[i - 1]], K[i - 1][w]);
        } else {
          K[i][w] = K[i - 1][w];
        }
      }
    }
    Logger.debug('Items selected : ');
    const selected = [];
    let tempW = maxWeight;
    let y = 0; //to index in selected
    for (let x = n; x > 0; x--) {
      if (
        tempW - weightArr[x - 1] >= 0 &&
        K[x][tempW] - K[x - 1][tempW - weightArr[x - 1]] == valueArr[x - 1]
      ) {
        selected[y++] = x - 1; //store current index and increment y
        tempW -= weightArr[x - 1];
      }
    }

    return selected;
  }

  knapSackOptimized(W, wt, val, n) {
    // making and initializing dp array
    const dp = Array(W + 1).fill(0);

    for (let i = 1; i < n + 1; i++) {
      for (let w = W; w >= 0; w--) {
        if (wt[i - 1] <= w)
          // finding the maximum value
          dp[w] = Math.max(dp[w], dp[w - wt[i - 1]] + val[i - 1]);
      }
    }
    return dp[W]; // returning the maximum value of knapsack
  }
}

// Driver program to test above function
async function main(): Promise<void> {
  const [values, latencies] = [
    TRANSACTIONS_TEST_ARR.map((transaction) => transaction.value),
    TRANSACTIONS_TEST_ARR.map((transaction) => transaction.latency),
  ];
  const W = 1000;
  const n = TRANSACTIONS_TEST_ARR.length;
  console.log(Knapsack.knapSack(W, latencies, values, n));
}

(async (): Promise<void> => {
  try {
    await main();
  } catch (e) {
    console.warn('❌', e);
    process.exit(1);
  }
})();

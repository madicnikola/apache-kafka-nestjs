// Returns the selected indexes so that maximum value that can be put in a knapsack of capacity W
export function knapSack(
  maxWeight: number,
  weightArr: number[],
  valueArr: number[],
  n: number,
): number[] {
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

  console.log('Items selected : ', selected);

  return selected;
}

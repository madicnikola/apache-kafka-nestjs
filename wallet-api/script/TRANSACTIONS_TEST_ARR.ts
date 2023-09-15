let id = 1;
export const TRANSACTIONS_TEST_ARR = [
    {value: 130, latency: 499},
    {value: 70, latency: 250},
    {value: 200, latency: 260},
    {value: 120, latency: 254},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
    {value: 200, latency: 460},
    {value: 120, latency: 330},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
    {value: 200, latency: 850},
    {value: 120, latency: 499},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
    {value: 200, latency: 850},
    {value: 120, latency: 450},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
    {value: 200, latency: 30},
    {value: 120, latency: 100},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
    {value: 200, latency: 330},
    {value: 120, latency: 500},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
    {value: 200, latency: 60},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
    {value: 200, latency: 500},
    {value: 20, latency: 50},
    {value: 40, latency: 100},
].map((transaction) => ({...transaction, id: id++}));

console.log(JSON.stringify(TRANSACTIONS_TEST_ARR));


// [{"value": 130, "latency": 499, "id": 1}, {"value": 70, "latency": 250, "id": 2}, {"value": 200, "latency": 260, "id": 3}, {"value": 120, "latency": 254, "id": 4}, {"value": 20, "latency": 50, "id": 5}, {"value": 40, "latency": 100, "id": 6}, {"value": 200, "latency": 460, "id": 7}, {"value": 120, "latency": 330, "id": 8}, {"value": 20, "latency": 50, "id": 9}, {"value": 40, "latency": 100, "id": 10}, {"value": 200, "latency": 850, "id": 11}, {"value": 120, "latency": 499, "id": 12}, {"value": 20, "latency": 50, "id": 13}, {"value": 40, "latency": 100, "id": 14}, {"value": 200, "latency": 850, "id": 15}, {"value": 120, "latency": 450, "id": 16}, {"value": 20, "latency": 50, "id": 17}, {"value": 40, "latency": 100, "id": 18}, {"value": 200, "latency": 30, "id": 19}, {"value": 120, "latency": 100, "id": 20}, {"value": 20, "latency": 50, "id": 21}, {"value": 40, "latency": 100, "id": 22}, {"value": 200, "latency": 330, "id": 23}, {"value": 120, "latency": 500, "id": 24}, {"value": 20, "latency": 50, "id": 25}, {"value": 40, "latency": 100, "id": 26}, {"value": 200, "latency": 60, "id": 27}, {"value": 20, "latency": 50, "id": 28}, {"value": 40, "latency": 100, "id": 29}, {"value": 200, "latency": 500, "id": 30}, {"value": 20, "latency": 50, "id": 31}, {"value": 40, "latency": 100, "id": 32}]
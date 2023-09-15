import { Client } from 'redis-om';

async function main(): Promise<void> {
  const client = await new Client().open('redis://localhost:6379');
  const times: Array<number> = JSON.parse(await client.get('avg')) ?? [];
  const avg =
    times.reduce((previousValue, currentValue) => previousValue + currentValue) / times.length;
  console.log(`AVG TIME----->  ${avg} ms ${times.length} calls`);
  await client.close();
}

(async (): Promise<void> => {
  try {
    await main();
  } catch (e) {
    console.warn('❌', e);
    process.exit(1);
  }
})();

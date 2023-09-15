import { rejects } from 'assert';

async function main(): Promise<void> {
  const p1 = new Promise((res) => setTimeout(() => res('p1'), 1000));
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => reject({ reason: 'p2 cos why not' }), 500);
  });
  try {
    const result = await Promise.race([p1, p2]);
  } catch (e) {
    console.log(e);
  }
}

(async (): Promise<void> => {
  try {
    await main();
  } catch (e) {
    console.warn('❌', e);
    process.exit(1);
  }
})();

import { timeoutPromise } from '../src/transactions/utils/timeout';
import { Logger } from '@nestjs/common';

async function retry(): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ms = Math.random() * 500;
      setTimeout(() => resolve('Resolved in ' + ms + 'ms.'), 500);
    });
  });
}

async function main(): Promise<void> {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    if (i == 7) {
      promises.push(
        new Promise((resolve, reject) =>
          setTimeout(() => reject('cos why not'), Math.random() * 500),
        ),
      );
      continue;
    }
    promises.push(
      new Promise((resolve, reject) => setTimeout(() => resolve('RESOLVED!'), Math.random() * 500)),
    );
  }
  try {
    const rejectedPromiseIndexes: Promise<any>[] = promises.map(async (promise, index, array) => {
      try {
        const timeout = timeoutPromise(500);
        await Promise.race([promise, timeout]);
        return;
      } catch {
        return index;
      }
    });
    const rejected = (await Promise.all(rejectedPromiseIndexes)).filter((value) => value);
    console.log('REJECTED', rejected);
  } catch (err) {
    Logger.error(err);
    Logger.warn('HELLO');
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

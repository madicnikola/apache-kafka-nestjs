import { delayFunction } from './delay';

export const timeoutPromise: (ms) => Promise<any> = async (ms) =>
  new Promise((resolve, reject) => setTimeout(() => reject('TIMEOUT!'), ms));

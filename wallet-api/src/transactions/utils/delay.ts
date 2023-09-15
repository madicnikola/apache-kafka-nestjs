export const promiseWithTimeout = (ms) => new Promise((res) => setTimeout(res, ms));
export const delayFunction = async (time) => {
  await promiseWithTimeout(time);
};

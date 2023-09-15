const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export const delayFunction = async (time) => {
  await delay(time);
};

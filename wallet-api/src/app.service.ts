import { Injectable } from '@nestjs/common';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const delayFunction = async (time) => {
  await delay(time);
};
@Injectable()
export class AppService {}

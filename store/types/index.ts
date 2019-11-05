import * as test from './test';

export type CustomAction = {
  type: string;
  payload: any;
}

export default {
  ...test,
}
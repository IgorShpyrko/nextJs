
import actionTypes, { CustomAction } from '../types';

type TestState = {
  foo: string
};

const initialState: TestState = {
  foo: 'bar',

};

const testReducer = (state: TestState = initialState, action: CustomAction) => {
  switch (action.type) {
    case actionTypes.TEST_SET:
      return action.payload
    default:
      return state
  }
}

export default testReducer;

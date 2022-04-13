import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'buyToken'
) {
  return {
    [constants.BUY_TOKEN_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true
      }
    },
    [constants.BUY_TOKEN_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.BUY_TOKEN_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

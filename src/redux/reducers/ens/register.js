import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'registerData'
) {
  return {
    [constants.REGISTER_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        success: false
      }
    },
    [constants.REGISTER_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.REGISTER_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

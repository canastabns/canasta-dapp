import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'commit'
) {
  return {
    [constants.COMMIT_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        success: false
      }
    },
    [constants.COMMIT_REQUEST_START]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        requestStart: true,
        success: false
      }
    },
    [constants.COMMIT_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        requestStart: false,
        success: true,
        data: payload
      }
    },
    [constants.COMMIT_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

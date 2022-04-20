import * as constants from 'redux/constants/myDomains';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'myDomains'
) {
  return {
    [constants.GET_MY_DOMAINS_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        success: false
      }
    },
    [constants.GET_MY_DOMAINS_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.GET_MY_DOMAINS_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

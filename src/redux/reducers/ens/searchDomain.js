import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'searchDomain'
) {
  return {
    [constants.SEARCH_DOMAIN_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true
      }
    },
    [constants.SEARCH_DOMAIN_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.SEARCH_DOMAIN_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'rentPrices'
) {
  return {
    [constants.GET_RENT_PRICES_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        success: false
      }
    },
    [constants.GET_RENT_PRICES_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.GET_RENT_PRICES_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

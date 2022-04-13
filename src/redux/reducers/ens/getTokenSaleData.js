import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'tokenSaleData'
) {
  return {
    [constants.GET_TOKEN_SALE_DATA_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true
      }
    },
    [constants.GET_TOKEN_SALE_DATA_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.GET_TOKEN_SALE_DATA_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'transferTo'
) {
  return {
    [constants.TRANSFER_DOMAIN_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        success: false
      }
    },
    [constants.TRANSFER_DOMAIN_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true
      }
    },
    [constants.TRANSFER_DOMAIN_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

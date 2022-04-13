import * as constants from 'redux/constants/wallet';

import {initialState} from './index';

export default function reducer(state = initialState, payload = {}) {
  return {
    [constants.DISCONNECT_WALLET_BEGIN]: { ...state, begin: true },
    [constants.DISCONNECT_WALLET_SUCCESS]: { ...state, ...initialState },
    [constants.DISCONNECT_WALLET_FAILURE]: { ...state, error: payload.error }
  };
}

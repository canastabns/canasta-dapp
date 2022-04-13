import * as constants from 'redux/constants/wallet';

import {initialState} from './index';

export default function reducer(state = initialState, payload = {}) {
  return {
    [constants.CONNECT_WALLET_BEGIN]: {
      ...state,
      begin: true,
      success: false
    },

    [constants.CONNECT_WALLET_SUCCESS]: {
      ...state,
      begin: false,
      success: true,
      address: payload.address,
      readOnly: payload.readOnly,
      networkId: payload.networkId,
      isCorrectedNetwork: payload.isCorrectedNetwork
    },

    [constants.ACCOUNTS_CHANGED]: { ...state, address: payload.address },
    [constants.NETWORK_CHANGED]: {
      ...state,
      networkId: payload.networkId,
      isCorrectedNetwork: payload.isCorrectedNetwork
    },
    [constants.CONNECT_WALLET_FAILURE]: { ...state, error: payload.error }
  };
}

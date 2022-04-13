import * as R from 'ramda';

import walletConnectReducer from './walletConnect';
import walletDisconnectReducer from './walletDisconnect';

export const initialState = {
  start: false,
  begin: false,
  error: null,
  address: '',
  readOnly: true
};

export default function reducer(state = initialState, action = {}) {
  const payload = R.pathOr({}, ['payload'], action);
  const mapping = {
    ...walletConnectReducer(state, payload),
    ...walletDisconnectReducer(state, payload)
  };

  return mapping[action.type] || state;
}

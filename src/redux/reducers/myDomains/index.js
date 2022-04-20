import * as R from 'ramda';

import getMyDomainsReducer from './get';

export const initialState = {
  myDomains: {
    begin: false,
    error: null,
    success: false,
    data: []
  }
};

export default function reducer(state = initialState, action = {}) {
  const payload = R.pathOr({}, ['payload'], action);
  const mapping = {
    ...getMyDomainsReducer(state, payload, 'myDomains')
  };

  return mapping[action.type] || state;
}

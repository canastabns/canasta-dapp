import * as R from 'ramda';

import getFavouritesReducer from './get';
import removeFavouritesReducer from './remove';
import saveFavouritesReducer from './save';

export const initialState = {
  favouritesData: {
    begin: false,
    error: null,
    success: false,
    data: []
  },
  saveFavourites: {
    begin: false,
    error: null,
    success: false
  },
  removeFavourites: {
    begin: false,
    error: null,
    success: false
  }
};

export default function reducer(state = initialState, action = {}) {
  const payload = R.pathOr({}, ['payload'], action);
  const mapping = {
    ...getFavouritesReducer(state, payload, 'favouritesData'),
    ...saveFavouritesReducer(state, payload, 'saveFavourites'),
    ...removeFavouritesReducer(state, payload, 'removeFavourites')
  };

  return mapping[action.type] || state;
}

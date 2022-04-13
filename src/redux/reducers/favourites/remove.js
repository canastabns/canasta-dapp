import * as constants from 'redux/constants/favourites';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'saveFavourites'
) {
  return {
    [constants.REMOVE_FAVOURITES_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        success: false
      }
    },
    [constants.REMOVE_FAVOURITES_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true
      }
    },
    [constants.REMOVE_FAVOURITES_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

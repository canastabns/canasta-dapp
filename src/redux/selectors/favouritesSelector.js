import * as R from 'ramda';
import {createSelector} from 'reselect';

const getState = state => R.pathOr({}, ['favourites'], state);

export const getFavourites = createSelector(
  getState,
  state => state.favouritesData
);

export const getSaveData = createSelector(
  getState,
  state => state.saveFavourites
);

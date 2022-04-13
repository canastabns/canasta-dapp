import * as R from 'ramda';
import {createSelector} from 'reselect';

const getState = state => R.pathOr({}, ['wallet'], state);

export const getWalletState = createSelector(
  getState,
  state => state
);

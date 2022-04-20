import * as R from 'ramda';
import {createSelector} from 'reselect';

const getState = state => R.pathOr({}, ['myDomains'], state);

export const getMyDomains = createSelector(
  getState,
  state => state.myDomains
);

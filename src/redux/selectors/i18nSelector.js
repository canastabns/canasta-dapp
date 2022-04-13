import * as R from 'ramda';
import {createSelector} from 'reselect';

const getState = state => R.pathOr({}, ['i18n'], state);

export const getTranslations = createSelector(
  getState,
  state => state
);

export function getDir(state) {
  return state.i18n.locale === 'ar' ? 'rtl' : 'ltr';
}

export const getLocale = createSelector(
  getState,
  state => state.locale
);

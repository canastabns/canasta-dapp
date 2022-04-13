import * as constants from 'redux/constants/i18n';

export const setI18NLocale = payload => ({
  type: constants.I18N_SET_LOCATE,
  locale: payload
});

/**
 * @description Init internal logic of change language.
 * @param payload
 * @return {{type: string, locale}}
 */
export const setLocale = payload => ({
  type: constants.I18N_BEGIN,
  payload
});

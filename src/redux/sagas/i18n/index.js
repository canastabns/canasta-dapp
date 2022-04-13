import {fallbackLocale, supportedLocales} from 'config/i18n';
import {setLocale} from 'react-redux-i18n';
import {all, takeEvery} from 'redux-saga/effects';
import * as constants from 'redux/constants/i18n';
import * as LocalStorage from 'utils/commons/localstorage';

function* changeLocale({payload}, dispatch) {
  const desiredLocale = payload,
    containDesiredLanguage = supportedLocales.hasOwnProperty(desiredLocale),
    locale = containDesiredLanguage ? desiredLocale : fallbackLocale;

  LocalStorage.setItem('@i18n/locale', {locale});
  dispatch(setLocale(locale));
}

export default function* rootInitialSaga(dispatch) {
  yield all([
    takeEvery(constants.I18N_BEGIN,
      payload => changeLocale(payload, dispatch)
    )
  ]);
}

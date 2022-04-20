import {all} from 'redux-saga/effects';
import ensSaga from 'redux/sagas/ens';
import favouritesSaga from 'redux/sagas/favourites';
import i18nSaga from 'redux/sagas/i18n';
import walletSaga from 'redux/sagas/wallet';
import myDomainSaga from 'redux/sagas/myDomains';

export default function* rootSagas(dispatch) {
  yield all([
    walletSaga(dispatch),
    i18nSaga(dispatch),
    ensSaga(),
    favouritesSaga(),
    myDomainSaga()
  ]);
}

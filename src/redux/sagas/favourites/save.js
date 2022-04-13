import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as favouritesConstants from 'redux/constants/favourites';
import * as LocalStorage from 'utils/commons/localstorage';

function* save({payload}) {
  try {
    let favouritesInStorage = LocalStorage.getItem('@app/favourites');

    if(R.isEmpty(favouritesInStorage) || !favouritesInStorage)
      favouritesInStorage = [];

    const exists = payload && favouritesInStorage.find(e => e.domain === payload);

    if(payload && !exists)
      favouritesInStorage.push({domain: payload});

    LocalStorage.setItem('@app/favourites', favouritesInStorage);

    yield put({
      type: favouritesConstants.GET_FAVOURITES_SUCCESS,
      payload: favouritesInStorage
    });

    yield put({
      type: favouritesConstants.SAVE_FAVOURITES_SUCCESS,
      payload: {}
    });

  } catch (error) {
    console.log('favourites save error', error);
    yield put({
      type: favouritesConstants.SAVE_FAVOURITES_FAILURE,
      payload: error?.message
    });
  }
}

export default save;

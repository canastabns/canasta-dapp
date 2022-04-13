import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as favouritesConstants from 'redux/constants/favourites';
import * as LocalStorage from 'utils/commons/localstorage';

function* remove({payload}) {
  try {
    let favouritesInStorage = LocalStorage.getItem('@app/favourites');

    if(R.isEmpty(favouritesInStorage))
      favouritesInStorage = [];

    if(payload)
      favouritesInStorage = favouritesInStorage.filter((row) => row.domain !== payload);

    if(favouritesInStorage.length > 0) {
      LocalStorage.setItem('@app/favourites', favouritesInStorage);
    } else {
      LocalStorage.removeItem('@app/favourites');
    }

    yield put({
      type: favouritesConstants.GET_FAVOURITES_SUCCESS,
      payload: favouritesInStorage
    });

    yield put({
      type: favouritesConstants.REMOVE_FAVOURITES_SUCCESS,
      payload: {}
    });

  } catch (error) {
    yield put({
      type: favouritesConstants.REMOVE_FAVOURITES_FAILURE,
      payload: error?.message
    });
  }
}

export default remove;

import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as favouritesConstants from 'redux/constants/favourites';
import * as LocalStorage from 'utils/commons/localstorage';

function* get() {
  try {
    let favouritesInStorage = LocalStorage.getItem('@app/favourites');

    if(R.isEmpty(favouritesInStorage))
      favouritesInStorage = [];

    yield put({
      type: favouritesConstants.GET_FAVOURITES_SUCCESS,
      payload: favouritesInStorage
    });
  } catch (error) {
    yield put({
      type: favouritesConstants.GET_FAVOURITES_FAILURE,
      payload: error?.message
    });
  }
}

export default get;

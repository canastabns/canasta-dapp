import {all, takeEvery} from 'redux-saga/effects';
import * as favouritesConstants from 'redux/constants/favourites';

import getFavourites from './get';
import removeFavourites from './remove';
import saveFavourites from './save';

export default function* rootInitialSaga() {
  yield all([
    takeEvery(favouritesConstants.SAVE_FAVOURITES_BEGIN, saveFavourites),
    takeEvery(favouritesConstants.GET_FAVOURITES_BEGIN, getFavourites),
    takeEvery(favouritesConstants.REMOVE_FAVOURITES_BEGIN, removeFavourites)
  ]);
}

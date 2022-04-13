import { i18nReducer } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import ens from './reducers/ens';
import favourites from './reducers/favourites';
import wallet from './reducers/wallet';

export default combineReducers({
  i18n: i18nReducer,
  wallet,
  ens,
  favourites
});

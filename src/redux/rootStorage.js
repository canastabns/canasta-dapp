import {createBrowserHistory} from 'history';
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore
} from 'react-redux-i18n';
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import * as LocalStorage from 'utils/commons/localstorage';

import translations from '../l10n/translations';
import Reactotron from './reactotron';
import rootReducers from './rootReducers';
import rootSagas from './rootSagas';

require('dotenv').config();

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];
const bannedActions = []; // use this to ban some actions from the redux console

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_ACTION_LOG === 'true'
) {
  middleware.push(
    createLogger({
      predicate: (getState, action) =>
        !bannedActions.some(a => a === action.type)
    })
  );
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(...middleware), Reactotron.createEnhancer())
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));

const lData = LocalStorage.getItem('@i18n/locale');
store.dispatch(setLocale(lData?.locale || 'en'));

sagaMiddleware.run(rootSagas, store.dispatch);

history.listen(location => {
  // listen changes in history
});

export {
  store,
  history
};

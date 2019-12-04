import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import firstReducer from './containers/Example1/reducer';
import secondReducer from './containers/Example2/reducer';
import Saga1 from './containers/Example1/sagas';
import Saga2 from './containers/Example2/sagas';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([Saga1(), Saga2()]);
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({ firstReducer, secondReducer });
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

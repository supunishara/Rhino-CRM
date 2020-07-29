import {createStore, applyMiddleware} from 'redux';
import reducer from '../Reducers';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../../Helpers/Saga';

//create Saga Middleware
const SagaMiddleware = createSagaMiddleware();

const middleware = [SagaMiddleware];
middleware.push(logger);
if (process.env === 'development') {
  middleware.push(logger);
}
const store = createStore(reducer, applyMiddleware(...middleware));
SagaMiddleware.run(rootSaga);
export default store;

//

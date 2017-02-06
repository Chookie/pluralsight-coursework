'use strict';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // reduxImmutableStateInvariant is only for dev, not used in prod normally.
    // See react-slinngshot for dev setup with hotloading etc.
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}

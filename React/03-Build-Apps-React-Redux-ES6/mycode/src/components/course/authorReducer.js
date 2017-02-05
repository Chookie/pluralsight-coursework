'use strict';

import * as types from './authorActionTypes';
import initialState from '../../store/initialState';

export default function authorReducer(state=initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}

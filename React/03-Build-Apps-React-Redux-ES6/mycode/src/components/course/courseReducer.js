'use strict';

import * as types from './courseActionTypes';

export default function courseReducer(state = [], action) {
  switch(action.type) {
    case types.CREATE_COURSE:
      return [...state,
         Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}

'use strict';

import {combineReducers} from 'redux';
import courses from './components/course/courseReducer';
import authors from './components/course/authorReducer';

const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;

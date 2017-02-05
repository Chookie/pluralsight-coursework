'use strict';

import {combineReducers} from 'redux';
import courses from './components/course/courseReducer';
import authors from './components/course/authorReducer';
import ajaxCallsInProgress from './components/common/ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;

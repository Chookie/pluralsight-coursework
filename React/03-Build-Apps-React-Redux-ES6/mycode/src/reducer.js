'use strict';

import {combineReducers} from 'redux';
import courses from './components/course/courseReducer';

const rootReducer = combineReducers({
  courses
});

export default rootReducer;

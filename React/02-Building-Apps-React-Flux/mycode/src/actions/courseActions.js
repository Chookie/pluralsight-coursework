'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var courseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CouseActions = {
  createCourse: function(course) {
    var newCourse = courseApi.saveCourse(course);

    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_COURSE,
      course: newCourse
    });
  }
};

module.exports = CouseActions;

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
  },
  updateCourse: function(course) {
    var updatedCourse = courseApi.saveCourse(course);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_COURSE,
      course: updatedCourse
    });
  },
  // Here we cold have 2 actions when async. first for delete course which notifies UI
  // that about to perform action.  Put UI in progress state.
  // Then when it is done send a DELETED_COURSE event.
  deleteCourse: function(id) {
    courseApi.deleteCourse(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_COURSE,
      id: id
    });
  }
};

module.exports = CouseActions;

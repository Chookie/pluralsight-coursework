'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

// _  means private
var _courses = [];

// Create helper methods over the emmitter since only care about change
var CourseStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllCourses: function() {
    return _courses;
  },

  getCourseById: function(id) {
    return _.find(_courses, {id: id});
  }
});

// This catches the Dispatcher.dispatch events
Dispatcher.register( function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALISE:
      _courses = action.initialData.courses;
      CourseStore.emitChange();
      break;
    case ActionTypes.CREATE_COURSE:
      _courses.push(action.course);
      // Notify any react components.
      CourseStore.emitChange();
      break;
    case ActionTypes.UPDATE_COURSE:
    // Manage course page is gettig a reference to the course
    // and updating that in manageCoursePage so don't really need this
    // but in real world would be saving to database and probable
    // get different data back.
      var existingCourse = _.find(_courses, {id: action.course.id});
      var existingCourseIndex = _.indexOf(_courses, existingCourse);
      _courses.splice(existingCourseIndex, 1, action.course);
      CourseStore.emitChange();
      break;
    case ActionTypes.DELETE_COURSE:
      _.remove(_courses, function(course) {
        return action.id === course.id;
      });
      CourseStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = CourseStore;

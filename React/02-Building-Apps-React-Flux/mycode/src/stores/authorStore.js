'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

// _  means private
var _authors = [];

// Create helper methods over the emmitter since only care about change
var AuthorStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllAuthors: function() {
    return _authors;
  },

  getAuthorById: function(id) {
    return _.find(_authors, {id: id});
  }
});

// This catches the Dispatcher.dispatch events
Dispatcher.register( function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALISE:
      _authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      // Notify any react components.
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
    // Manage author page is gettig a reference to the author
    // and updating that in manageAuthorPage so don't really need this
    // but in real world would be saving to database and probable
    // get different data back.
      var existingAuthor = _.find(_authors, {id: action.author.id});
      var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
      _authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      _.remove(_authors, function(author) {
        return action.id === author.id;
      });
      AuthorStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = AuthorStore;

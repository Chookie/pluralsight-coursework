'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var authorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  // Action Creator = Handy helper method that makes it easy to dispatch
  createAuthor: function(author) {
    // Normally you would use promises here for async call
    var newAuthor = authorApi.saveAuthor(author);

    // Notifies all stores about this action
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      author: newAuthor
    });
  },
  updateAuthor: function(author) {
    var updatedAuthor = authorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor
    });
  },
  // Here we cold have 2 actions when async. first for delete author which notifies UI
  // that about to perform action.  Put UI in progress state.
  // Then when it is done send a DELETED_AUTHOR event.
  deleteAuthor: function(id) {
    authorApi.deleteAuthor(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id
    });
  }
};

module.exports = AuthorActions;

'use strict';

import * as types from './ajaxActionTypes';
import initialState from '../../store/initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

function actionTypeIsErrors(type) {
  return type === types.AJAX_CALL_ERROR;
}

export default function ajaxStatusReducer(state=initialState.numAjaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (actionTypeIsErrors(action.type) || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}

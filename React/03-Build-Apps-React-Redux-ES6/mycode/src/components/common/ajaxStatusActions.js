'use strict';

import * as types from './commonActionTypes';

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL};
}

'use strict';

import React, {PropTypes} from 'react';
import ManageCourseRow from './ManageCourseRow';

const ManageCourse = ({ManageCourse,onChange, onSave}) => {
  return (
    <div>
      <input
      type="text"
      onChange={onChange}
      value={ManageCourse.title} />

      <input
      type="submit"
      value="save"
      onClick={onSave} />
    </div>
  );
};

ManageCourse.propTypes = {
  ManageCourse: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ManageCourse;

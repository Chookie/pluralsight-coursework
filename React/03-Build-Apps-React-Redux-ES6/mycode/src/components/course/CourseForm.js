"use strict";

import React, { PropTypes } from "react";
import TextInput from './common/TextInput';
import SelectInput from './common/SelectInput';

const name = ({course, allAuthors, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        name="authorId"
        label="Author"
        value="{courseauthorId}"
        defaulOption="Select Author"
      />

      <TextInput
        name="category"
        label="Category"
        value={course.cetegory}
        onChange={onChange}
        error={errors.category}
      />

      <TextInput
        name="length"
        label="Length"
        value={course.length}
        onChange={onChange}
        error={errors.length}
      />

      <input
        type="submit"
        disabled={loading}
        value={loading ? "Saving..." : "Save"}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

name.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.fucn.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.boold,
  errors: PropTypes.object
};

export default name;

'use strict';

var React = require('react');
var Input = require('../common/textInput');

var CourseForm = React.createClass({
  propTypes: {
    course: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <form>
        <h1>Manage Course</h1>
        <Input
          name='title'
          label="Title"
          value={this.props.course.title}
          onChange={this.props.onChange}
        />
        <input
          type='submit'
          value='Save'
          className='btn btn-default'
          onClick={this.props.onSave} 
        />
      </form>
    );
  }
});

module.exports = CourseForm;

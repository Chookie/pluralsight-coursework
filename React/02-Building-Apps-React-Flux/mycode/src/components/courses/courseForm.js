'use strict';

var React = require('react');
var Input = require('../common/textInput');
var Dropdown = require('../common/dropDown');

var CourseForm = React.createClass({
  propTypes: {
    course: React.PropTypes.object.isRequired
  },

  render: function() {
    var authors = [
    {
      id: "cory-house",
      name: "Cory House"
    }, {
      id: "alison-johnsto",
      name: "Alison Johnston"
    }];
    return (
      <form>
        <h1>Manage Course</h1>
        <Input
          name='title'
          label="Title"
          value={this.props.course.title}
          onChange={this.props.onChange}
          error = {this.props.errors.title}
        />
        <Dropdown
          name={this.props.course.id}
          className='form-control'
          options={authors}
          keyField='id'
          labelField='name'
          value={[this.props.course.author.id, this.props.course.author.name]}
          onChange={this.props.onChange}
        />
        <Input
          name='length'
          label="Length"
          value={this.props.course.length}
          onChange={this.props.onChange}
          error = {this.props.errors.author}
        />
        <Input
          name='category'
          label="Category"
          value={this.props.course.category}
          onChange={this.props.onChange}
          error = {this.props.errors.author}
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

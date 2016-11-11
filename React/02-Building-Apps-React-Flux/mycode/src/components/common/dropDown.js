'use strict';

var React = require('react');

var Dropdown = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.string]),
    keyField: React.PropTypes.string.isRequired,
    labelField: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {value: null, keyField: 'value', labelField: 'label', onChange: null};
  },
  getInitialState: function() {
    var selected = this.getSelectedFromProps(this.props);
    return {selected: selected};
  },
  componentWillReceiveProps: function(nextProps) {
    var selected = this.getSelectedFromProps(nextProps);
    this.setState({selected: selected});
  },
  getSelectedFromProps: function(props) {
    var selected;
    if (props.value === null && props.options.length !== 0) {
      selected = props.options[0][props.keyField];
    } else {
      selected = props.value;
    }
    return selected;
  },
  render: function() {
    var that = this;
    var options = this.props.options.map(function(option) {
      return (
        <option key={option[that.props.keyField]} value={option[that.props.keyField]}>
          {option[that.props.labelField]}
        </option>
      );
    });
    return (
      <select
        name={this.props.name}
        ref={this.props.name}
        className='form-control'
        value={this.state.selected}
        onChange={this.props.onChange}>
        {options}
      </select>
    );
  }
});

module.exports = Dropdown;

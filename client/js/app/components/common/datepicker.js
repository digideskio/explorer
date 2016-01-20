/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var moment = require('moment');
var classNames = require('classnames');
var ReactDatePicker = require('react-date-picker');
function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

var Datepicker = React.createClass({

  handleOnBlur: function(event) {
    if (event.relatedTarget && findAncestor(event.relatedTarget, 'picker') !== null) {
      return
    }
    var newState = { showPicker: false };
    var value = event.target.value;
    var isValid = moment(new Date(value)).isValid();

    if (isValid) {
      this.props.onBlur(event);
      newState.errorMsg = false;
    } else if (value && !isValid) {
      newState.errorMsg = 'Invalid';
    }

    this.setState(newState);
  },

  onFocus: function() {
    this.setState({ showPicker: true });
  },

  onDateSelected: function(dateString) {
    this.props.onSet(this.props.name, new Date(dateString));
    this.setState({ showPicker: false });
  },

  onInputChange: function() {
    // Noop
  },

  // React methods

  getInitialState: function() {
    return {
      showPicker: false,
      errorMsg: false
    };
  },

  getDefaultProps: function () {
    return {
      refValue: 'datepicker',
      label: false,
      onChange: function(){},
      placeholder: '',
      classes: 'datepicker-wrapper form-group',
      onSet: function(){}
    };
  },

  render: function() {
    var label = this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null;
    var errorMsg = this.state.errorMsg ? <p>{this.state.errorMsg}</p> : '';
    var pickerWrapperClasses = classNames({
      'picker': true,
      'hide':  !this.state.showPicker
    });

    return (
      <div className={this.props.classes}>
        {label}
        <input type="text"
                     ref={this.props.refValue}
                     name={this.props.name}
                     className="form-control datepicker-input"
                     value={this.props.value}
                     onChange={this.onInputChange}
                     onBlur={this.handleOnBlur}
                     onFocus={this.onFocus}
                     placeholder={this.props.placeholder} />
        <div className={pickerWrapperClasses}>
          <ReactDatePicker minDate={this.props.minimum}
                           date={moment(new Date(this.props.value))}
                           onChange={this.onDateSelected} />
        </div>
        {errorMsg}
      </div>
    );
  }
});

module.exports = Datepicker;

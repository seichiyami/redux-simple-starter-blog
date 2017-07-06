import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title'
  },
  categories: {
    type: 'input',
    label: 'Categories'
  },
  content: {
    type: 'textarea',
    label: 'Post Content'
  }
};

class PostsNew extends Component {
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  renderFieldContent(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <field.fieldConfig.type
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderField(fieldConfig, key) {
    return (
      <Field
        key={key}
        label={fieldConfig.label}
        name={key}
        fieldConfig={fieldConfig}
        component={this.renderFieldContent}
      />
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
  //fields: _.keys(FIELDS)
})(
  connect(null, { createPost })(PostsNew)
);

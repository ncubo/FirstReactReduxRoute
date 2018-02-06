import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPosts } from '../actions';

class PostsNew extends Component {

  renderField(field){
    // antes se usaba field.meta.touched o field.meta.error
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.labelToShow}</label>
        <input
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

  onSubmit(values){
    this.props.createPosts(values, () => {
      this.props.history.push('/');
    });
  }

  render(){
      const { handleSubmit } = this.props;

      return(
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            labelToShow="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            labelToShow="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            labelToShow="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      );
  }
}

function validate(values){
  // the values are the name properties in Field
// console.log(values) -> {title:'asdas', categories: 'fasas', content:'asdas'}
  const errors = {};

  //validate the inputs from 'values'
  if(!values.title || values.title.length < 3){
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if(!values.categories){
    errors.categories = "Enter some categories!";
  }
  if(!values.content){
    errors.content = "Enter some content please!";
  }

  // If errors is empty, the form is fine to submit
  // If error has *any* properties, redux form assumes form is invalid
  return errors;

}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(connect(null,{createPosts})(PostsNew));

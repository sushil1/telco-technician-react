import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import { InlineError } from '../messages';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.email) errors.email = "Can't be blank";
    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && (
          <Message negative>
            <Message.Header>Something went wrong!</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={data.email}
            onChange={this.onChange}
          />

          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={this.onChange}
          />

          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <div className="ui fluid buttons">
          <button type="submit" className="ui teal button">
            Login
          </button>
          <div className="or" />
          <a className="ui button">Cancel</a>
        </div>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;

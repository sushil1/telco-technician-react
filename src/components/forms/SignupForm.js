import React, { Component } from 'react';
import { Form, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import { InlineError } from '../messages';

class SignupForm extends Component {
	state = {
		data: {
			email: '',
			password: '',
			passwordConfirmation: ''
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
		if (!data.passwordConfirmation)
			errors.passwordConfirmation = 'confirm your password';
		if (data.password !== data.passwordConfirmation)
			errors.password = 'Password must match';
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;
		return (
			<Segment>
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

					<Form.Field error={!!errors.passwordConfirmation}>
						<label htmlFor="passwordConfirmation">Confirm Password</label>
						<input
							name="passwordConfirmation"
							type="password"
							placeholder="Confirm your password"
							value={data.passwordConfirmation}
							onChange={this.onChange}
						/>

						{errors.passwordConfirmation && (
							<InlineError text={errors.passwordConfirmation} />
						)}
					</Form.Field>

					<div className="ui fluid buttons">
						<button type="submit" className="ui teal button">
							Signup
						</button>
						<div className="or" />
						<a className="ui button">Cancel</a>
					</div>
				</Form>
			</Segment>
		);
	}
}

SignupForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default SignupForm;

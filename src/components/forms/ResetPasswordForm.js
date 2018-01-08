import React, { Component } from 'react';
import { Form, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { InlineError } from '../messages';

class ResetPasswordForm extends Component {
	state = {
		data: {
			password: '',
			passwordConfirmation: '',
			token: this.props.token
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
		if (!data.password) errors.password = "Can't be blank";
		if (data.password !== data.passwordConfirmation)
			errors.password = 'Passwords must match';
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;
		return (
			<Segment>
				<Form onSubmit={this.onSubmit} loading={loading}>
					{!!errors.global && <Message negative>{errors.global}</Message>}
					<Form.Field error={!!errors.password}>
						<label htmlFor="password">New Password</label>
						<input
							name="password"
							type="password"
							placeholder="Enter your new password"
							value={data.password}
							onChange={this.onChange}
						/>

						{errors.password && <InlineError text={errors.password} />}
					</Form.Field>

					<Form.Field error={!!errors.password}>
						<label htmlFor="passwordConfirmation">
							Confirm your new password
						</label>
						<input
							name="passwordConfirmation"
							type="password"
							placeholder="Confirm your password"
							value={data.passwordConfirmation}
							onChange={this.onChange}
						/>
					</Form.Field>

					<div className="ui fluid buttons">
						<button type="submit" className="ui teal button">
							Reset Password
						</button>
					</div>
				</Form>
			</Segment>
		);
	}
}

ResetPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default ResetPasswordForm;

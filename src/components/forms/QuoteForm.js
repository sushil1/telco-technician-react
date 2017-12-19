import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { InlineError } from '../messages';

class QuoteForm extends Component {
	state = {
		data: {
			name: '',
			address: '',
			contact: '',
			message: ''
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
		if (!data.contact) errors.contact = "Can't be blank";
		if (!data.name) errors.name = "Can't be blank";
		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;
		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{errors.global && (
					<Message negative>
						<Message.Header>Something went wrong!</Message.Header>
						<p>{errors.global}</p>
					</Message>
				)}
				<Form.Group widths="equal">
					<Form.Field error={!!errors.name}>
						<label htmlFor="name">Name</label>
						<input
							name="name"
							type="text"
							placeholder="Enter your name"
							value={data.name}
							onChange={this.onChange}
						/>

						{errors.name && <InlineError text={errors.name} />}
					</Form.Field>

					<Form.Field error={!!errors.contact}>
						<label htmlFor="contact">Contact</label>
						<input
							name="contact"
							type="text"
							placeholder="Enter your contact"
							value={data.contact}
							onChange={this.onChange}
						/>

						{errors.contact && <InlineError text={errors.contact} />}
					</Form.Field>
				</Form.Group>

				<Form.Field error={!!errors.address}>
					<label htmlFor="address">Address</label>
					<input
						name="address"
						type="text"
						placeholder="Enter your address"
						value={data.address}
						onChange={this.onChange}
					/>

					{errors.address && <InlineError text={errors.address} />}
				</Form.Field>

				<Form.Field error={!!errors.message}>
					<label htmlFor="message">Message</label>
					<textarea
						name="message"
						type="text"
						placeholder="Say us more about your problem"
						value={data.message}
						onChange={this.onChange}
						max={10}
					/>

					{errors.message && <InlineError text={errors.message} />}
				</Form.Field>

				<div className="ui fluid buttons">
					<button type="submit" className="ui primary button">
						Send
					</button>
					<div className="or" />
					<a className="ui button">Cancel</a>
				</div>
			</Form>
		);
	}
}

QuoteForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default QuoteForm;

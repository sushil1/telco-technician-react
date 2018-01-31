import React, { Component } from 'react';
import { Form, Message, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import isEmail from 'validator/lib/isEmail';
import { InlineError } from '../messages';

import 'react-datepicker/dist/react-datepicker.css';

const initialData = {
	name: '',
	email: '',
	mobile: '',
	address: '',
	service: null,
	date: null,
	message: ''
};

class ServiceForm extends Component {
	state = {
		data: initialData,
		loading: false,
		errors: {}
	};

	// componentDidMount() {
	// 	this.props.serviceId &&
	// 		this.setState({
	// 			data: { ...this.state.data, service: this.props.serviceId }
	// 		})
	// }

	handleDateChange = date =>
		this.setState({
			data: { ...this.state.data, date }
		});

	handleDateSelect = date =>
		this.setState({
			data: { ...this.state.data, date }
		});

	handleStringChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	handleNumberChange = e =>
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: parseInt(e.target.value, 10)
			}
		});

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({
				loading: true
			});
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
		if (!data.mobile) errors.mobile = "Can't be blank";
		if (!data.service) errors.service = "Can't be blank";
		if (!data.address) errors.address = "Can't be blank";
		if (!data.name) errors.name = "Can't be blank";
		if (!data.date) errors.date = "Can't be blank";

		return errors;
	};

	handleOptionsChange = (e, value) => {
		this.setState({
			data: { ...this.state.data, [value.name]: value.value }
		});
	};

	render() {

		const { data, errors, loading } = this.state;
		const defaultService = this.props.serviceId
		const serviceOptions = this.props.serviceOptions;
		return (

				<Form onSubmit={this.onSubmit} loading={loading}>
					{!!errors.global && (
						<Message negative>
							<Message.Header>Something went wrong!</Message.Header>
							<p>{errors.global}</p>
						</Message>
					)}

					<Form.Field error={!!errors.name}>
						<label htmlFor="name">Name</label>
						<input
							name="name"
							type="text"
							placeholder="Enter your name"
							value={data.name}
							onChange={this.handleStringChange}
						/>

						{errors.name && <InlineError text={errors.name} />}
					</Form.Field>

					<Form.Group widths="equal">
						<Form.Field error={!!errors.mobile}>
							<label htmlFor="mobile">Mobile</label>
							<input
								name="mobile"
								type="text"
								placeholder="Enter your mobile"
								value={data.mobile}
								onChange={this.handleStringChange}
							/>

							{errors.mobile && <InlineError text={errors.mobile} />}
						</Form.Field>

						<Form.Field error={!!errors.email}>
							<label htmlFor="email">Email</label>
							<input
								style={{}}
								name="email"
								type="text"
								placeholder="Enter your email"
								value={data.email}
								onChange={this.handleStringChange}
							/>

							{errors.email && <InlineError text={errors.email} />}
						</Form.Field>
					</Form.Group>

					<Form.Field error={!!errors.address}>
						<label htmlFor="address">Address</label>
						<input
							name="address"
							type="text"
							placeholder="Enter your address, street, suburb"
							value={data.address}
							onChange={this.handleStringChange}
						/>

						{errors.address && <InlineError text={errors.address} />}
					</Form.Field>
					<Form.Group widths="equal">
						<Form.Field error={!!errors.service}>
							<label>Select Service</label>
							<Dropdown
								placeholder="Select Services"
								fluid
								name="service"
								search
								selection
								defaultValue={
									defaultService
								}
								options={serviceOptions}
								onChange={this.handleOptionsChange}
							/>
							{errors.service && <InlineError text={errors.service} />}
						</Form.Field>

						<Form.Field error={!!errors.date}>
							<label htmlFor="date">Pick Date and Time</label>

							<DatePicker
								selected={data.date}
								onSelect={this.handleDateSelect}
								onChange={this.handleDateChange}
								openToDate={moment()}
								minDate={moment()}
								maxDate={moment().add(14, 'days')}
								showTimeSelect
								placeholderText="Select date and time"
								timeFormat="HH:mm"
								timeIntervals={60}
								minTime={moment()
									.hours(8)
									.minutes(0)}
								maxTime={moment()
									.hours(18)
									.minutes(0)}
								dateFormat="LLL"
							/>

							{errors.date && <InlineError text={errors.date} />}
						</Form.Field>
					</Form.Group>

					<Form.Field error={!!errors.message}>
						<label htmlFor="message">Message</label>
						<textarea
							rows={2}
							name="message"
							type="text"
							placeholder="Enter your message"
							value={data.message}
							onChange={this.handleStringChange}
						/>

						{errors.message && <InlineError text={errors.message} />}
					</Form.Field>

					<div className="ui fluid buttons">
						<button type="submit" className="ui teal button">
							Book
						</button>
						<div className="or" />
						<a className="ui button" onClick={() => this.props.handleDismiss()}>
							Cancel
						</a>
					</div>
				</Form>

		);
	}
}

export default ServiceForm;

/*global google*/

import React, { Component } from 'react';
import { Form, Message, Dropdown, Segment, Divider } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import PlacesAutocomplete from 'react-places-autocomplete';

import isEmail from 'validator/lib/isEmail';
import { InlineError } from '../messages';

import 'react-datepicker/dist/react-datepicker.css';

const initialData = {
  email: '',
  address: '',
  mobile: '',
  date: null,
  name: '',
  message: '',
  service: null,
  jobStatus: null,
  assignedStaff: null,
  paymentStatus: null,
  notes: '',
  bookingId: '',
  quoteId: '',
  cost: ''
};

class TicketForm extends Component {
  state = {
    data: initialData,
    loading: false,
    errors: {},
    formStatus: ''
  };

  componentDidMount() {
    this.props.ticketData._id
      ? this.setState({
          data: { ...this.state.data, ...this.props.ticketData },
          formStatus: 'Update'
        })
      : this.setState({
          data: { ...this.state.data, ...this.props.ticketData },
          formStatus: 'Create'
        });
  }

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

  handleAddressChange = address =>
    this.setState({
      data: { ...this.state.data, address }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.state.data._id
        ? this.props.updateTicket(this.state.data).catch(err =>
            this.setState({
              errors: err.response.data.errors,
              loading: false
            })
          )
        : this.props.submitNewTicket(this.state.data).catch(err =>
            this.setState({
              errors: err.response.data.errors,
              loading: false
            })
          );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.email) errors.email = "Can't be blank";
    if (!data.name) errors.name = "Can't be blank";
    if (!isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.service) errors.service = "Can't be blank";
    if (!data.mobile) errors.mobile = "Can't be blank";
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
    const staffOptions = this.props.staffOptions;
    const paymentStatusOptions = this.props.paymentOptions;
    const jobStatusOptions = this.props.jobStatusOptions;
    const { data, errors, loading, formStatus } = this.state;
    const serviceOptions = this.props.serviceOptions;
    const defaultServiceValue = this.props.ticketData.service
      ? this.props.ticketData.service._id
      : null;
    const defaultStaffValue = this.props.ticketData.assignedStaff
      ? this.props.ticketData.assignedStaff._id
      : null;
    const defaultjobStatus = this.props.ticketData.jobStatus
      ? this.props.ticketData.jobStatus._id
      : null;
    const defaultpaymentStatus = this.props.ticketData.paymentStatus
      ? this.props.ticketData.paymentStatus._id
      : null;

    const addressInputProps = {
      value: this.state.data.address,
      onChange: this.handleAddressChange,
      placeholder: 'Enter your address..'
    };
    const addressOptions = {
      location: new google.maps.LatLng(-34, 151),
      radius: 50000,
      types: ['address']
    };
    const shouldFetchSuggestions = ({ value }) => value.length > 3;

    return (
      <div>
        <h3>{formStatus} Ticket</h3>
        <Divider />
        <Segment>
          <Form onSubmit={this.onSubmit} loading={loading}>
            {!!errors.global && (
              <Message negative>
                <Message.Header>Something went wrong!</Message.Header>
                <p>{errors.global}</p>
              </Message>
            )}

            <Form.Field error={!!errors.name}>
              <label htmlFor="name">Customer Name</label>
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
                <label htmlFor="mobile">Contact</label>
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
              <PlacesAutocomplete
                inputProps={addressInputProps}
                options={addressOptions}
                styles={{ autocompleteContainer: { zIndex: 1 } }}
                shouldFetchSuggestions={shouldFetchSuggestions}
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
                  defaultValue={defaultServiceValue}
                  options={serviceOptions}
                  onChange={this.handleOptionsChange}
                />
                {errors.service && <InlineError text={errors.service} />}
              </Form.Field>

              <Form.Field error={!!errors.date}>
                <label htmlFor="date">Pick Date and Time</label>

                <DatePicker
                  selected={
                    moment(data.date).isValid() ? moment(data.date) : data.date
                  }
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
            <Form.Group widths="equal">
              <Form.Field error={!!errors.assignedStaff}>
                <label>Assign To Staff</label>
                <Dropdown
                  placeholder="Assign ticket to staff"
                  fluid
                  defaultValue={defaultStaffValue}
                  name="assignedStaff"
                  search
                  selection
                  options={staffOptions}
                  onChange={this.handleOptionsChange}
                />
                {errors.assignedStaff && (
                  <InlineError text={errors.assignedStaff} />
                )}
              </Form.Field>

              <Form.Field error={!!errors.jobStatus}>
                <label>Update Job Status</label>
                <Dropdown
                  placeholder="Update Status of the job"
                  fluid
                  defaultValue={defaultjobStatus}
                  name="jobStatus"
                  search
                  selection
                  options={jobStatusOptions}
                  onChange={this.handleOptionsChange}
                />
                {errors.jobStatus && <InlineError text={errors.jobStatus} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field error={!!errors.mobile}>
                <label htmlFor="cost">Cost</label>
                <input
                  name="cost"
                  type="text"
                  placeholder="Enter the price of service"
                  value={data.cost}
                  onChange={this.handleStringChange}
                />

                {errors.cost && <InlineError text={errors.cost} />}
              </Form.Field>
              <Form.Field error={!!errors.paymentStatus}>
                <label>Update Payment</label>
                <Dropdown
                  placeholder="Update Payment"
                  fluid
                  defaultValue={defaultpaymentStatus}
                  name="paymentStatus"
                  search
                  selection
                  options={paymentStatusOptions}
                  onChange={this.handleOptionsChange}
                />
                {errors.paymentStatus && (
                  <InlineError text={errors.paymentStatus} />
                )}
              </Form.Field>
            </Form.Group>

            <Form.Field error={!!errors.message}>
              <label htmlFor="message">Customer Message</label>
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
            <Form.Field error={!!errors.notes}>
              <label htmlFor="notes">Notes</label>
              <textarea
                rows={2}
                name="notes"
                type="text"
                placeholder="Enter your notes"
                value={data.notes}
                onChange={this.handleStringChange}
              />

              {errors.notes && <InlineError text={errors.notes} />}
            </Form.Field>
            <div className="ui fluid buttons">
              <button type="submit" className="ui primary button">
                {formStatus} Ticket
              </button>
              <div className="or" />
              <a className="ui button" onClick={() => this.props.closeModal()}>
                Cancel
              </a>
            </div>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default TicketForm;

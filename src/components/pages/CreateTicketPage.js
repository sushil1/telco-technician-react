import React from 'react';
import { Modal, Icon, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createTicket, updateTicket } from '../../actions/tickets';
import { updateBooking } from '../../actions/bookings';
import { updateQuote } from '../../actions/quotes';
import { TicketForm } from '../forms';
import {fetchStaffOptions, fetchPaymentOptions, fetchJobStausOptions} from '../../actions/form'


class CreateTicketPage extends React.Component {
	state = {
		open: true
	};

	//lets fetch the form options required in our form
	//staffOptions to assign, payment Options and job status Options

	componentDidMount(){
		this.props.fetchStaffOptions()
		// this.props.fetchPaymentOptions()
		// this.props.fetchJobStausOptions()
	}

	updateTicket = data => {
		const updatedData = {
			...data
		};

		if (typeof data.service === 'object') {
			updatedData['service'] = data.service._id;
		}
		if (typeof data.assignedStaff === 'object') {
			updatedData['assignedStaff'] = data.assignedStaff._id;
		}

		delete updatedData['_id'];
		delete updatedData['createdAt'];

		return this.props
			.updateTicket(data._id, updatedData)
			.then(() => this.closeModal());
	};

	submit = data => {
		const { bookingId, quoteId } = data;

		const updatePrevResource = !!bookingId
			? Promise.resolve(
					this.props.updateBooking(bookingId, { proceedToTicket: true })
				)
			: !!quoteId
				? Promise.resolve(
						this.props.updateQuote(quoteId, { proceedToTicket: true })
					)
				: null;

		const createNewTicket = Promise.resolve(this.props.createTicket(data));

		return Promise.all([createNewTicket, updatePrevResource]).then(() =>
			this.closeModal()
		);
	};

	closeModal = () => {
		this.setState({
			open: false
		});
		this.props.hideTicketForm();
	};

	render() {
		console.log(this.props.form)
		const { ticketData, serviceOptions, staffOptions } = this.props;
		return (
			<Grid.Column mobile={12} tablet={10} computer={8}>
				<Modal
					open={this.state.open}
					closeOnDimmerClick={true}
					closeIcon
					closeOnEscape={true}
					closeOnRootNodeClick={true}
					onClose={this.closeModal}>
					<Icon name="close" onClick={() => this.closeModal()} />
					<Segment raised color="teal">
						<Modal.Content>
							<TicketForm
								ticketData={ticketData}
								closeModal={this.closeModal}
								serviceOptions={serviceOptions}
								submitNewTicket={this.submit}
								updateTicket={this.updateTicket}
								staffOptions={staffOptions}
							/>
						</Modal.Content>
					</Segment>
				</Modal>
			</Grid.Column>
		);
	}
}

function stateToProps(state){
	const form = state.form
	return{
		staffOptions: form.staffOptions
	}
}

export default connect(stateToProps, {
	createTicket,
	updateBooking,
	updateQuote,
	updateTicket,
	fetchStaffOptions, fetchPaymentOptions, fetchJobStausOptions
})(CreateTicketPage);

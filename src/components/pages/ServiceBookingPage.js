import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Message,
	Icon,
	Grid,
	Segment,
	Divider
} from 'semantic-ui-react';
import { ServiceForm } from '../forms';
import { bookService } from '../../actions/bookings';
import { fetchAll } from '../../actions/services';
import { Link } from 'react-router-dom';

class ServiceBookingPage extends React.Component {
	state = {
		showSucessMessage: false,
	};

	componentDidMount() {
		Object.keys(this.props.serviceOptions.length === 0) &&
			this.props.fetchAll();
	}

	submit = data =>
		this.props
			.bookService(data)
			.then(() => this.setState({ showSucessMessage: true }));

	handleDismiss = () => {
		this.setState({ showSucessMessage: false });
		this.props.history.goBack();
	};

	render() {
		const { showSucessMessage } = this.state;


		const messageComponent = (
			<Message success icon floating>
				<Icon name="check" tiny="true" />
				<Message.Content>
					<Message.Header>Booking Request Sent!</Message.Header>
					Our technician will contact you for confirmation.
				</Message.Content>
				<Icon name="close" tiny="true" onClick={this.handleDismiss} />
			</Message>
		);

		return (
			<Grid.Row centered>
				{showSucessMessage ? (
					<Grid.Column mobile={14} tablet={10} computer={8}>
						{messageComponent}
					</Grid.Column>
				) : (
					<Grid.Column mobile={14} tablet={10} computer={8}>
						<Segment raised color="teal">
							<h4>Book Service</h4>
							<Divider />
							<ServiceForm
								submit={this.submit}
								serviceOptions={this.props.serviceOptions}
								serviceId={this.props.match.params._id}
								handleDismiss={this.handleDismiss}
							/>
							<Segment inverted>
								<span>
									We confirm your booking and work to solve your problems right
									away!
								</span>{' '}
								<Link to="/signup">
									Sign up with us to track your bookings.
								</Link>
							</Segment>
						</Segment>
					</Grid.Column>
				)}
			</Grid.Row>
		);
	}
}

ServiceBookingPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	bookService: PropTypes.func.isRequired
};

function stateToProps(state) {
	const service = state.service.list;
	const options = Object.values(service).map(item => ({
		key: item._id,
		value: item._id,
		text: item.name
	}));
	return {
		serviceOptions: options
	};
}

export default connect(stateToProps, { bookService, fetchAll })(
	ServiceBookingPage
);
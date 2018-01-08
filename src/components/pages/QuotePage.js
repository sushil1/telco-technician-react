import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon, Grid, Segment, Divider } from 'semantic-ui-react';
import { QuoteForm } from '../forms';
import { createQuote } from '../../actions/quotes';
import { Link } from 'react-router-dom';

class QuotePage extends React.Component {
	state = {
		showSucessMessage: false
	};

	submit = data =>
		this.props
			.createQuote(data)
			.then(() => this.setState({ showSucessMessage: true }));

	handleDismiss = () => this.props.history.push('/');

	hideSuccessMessage = () => this.setState({ showSucessMessage: false });

	render() {
		const { showSucessMessage } = this.state;
		const successMessage = (
			<Message success icon floating>
				<Icon name="check" tiny="true" />
				<Message.Content>
					<Message.Header>Quote Request Sent!</Message.Header>
					We will contact you ASAP.
				</Message.Content>
				<Icon className="close" onClick={this.handleDismiss} />
			</Message>
		);

		return (
			<Grid.Row centered>
				{showSucessMessage ? (
					<Grid.Column mobile={14} computer={8} tablet={10}>
						{successMessage}
					</Grid.Column>
				) : (
					<Grid.Column mobile={14} computer={8} tablet={10}>
						<Segment raised color="teal">
							<h4>Send us a quote request</h4>
							<Divider />
							<QuoteForm submit={this.submit} />
							<Segment inverted>
								<span>We give you a response ASAP!</span>{' '}
								<Link to="/signup">
									Sign Up with us to track your quotes and bookings.
								</Link>
							</Segment>
						</Segment>
					</Grid.Column>
				)}
			</Grid.Row>
		);
	}
}

QuotePage.propTypes = {
	createQuote: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default connect(null, { createQuote })(QuotePage);

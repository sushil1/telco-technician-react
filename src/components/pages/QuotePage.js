import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { QuoteForm } from '../forms';
import { createQuote } from '../../actions/quotes';

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
		return (
			<div className="ui grid">
				<div className="twelve wide column centered">
					{showSucessMessage ? (
						<Message success icon floating>
							<Icon name="check" tiny="true" />
							<Message.Content>
								<Message.Header>Quote Request Sent!</Message.Header>
								We will contact you ASAP.
							</Message.Content>
							<Icon className="close" onClick={this.handleDismiss} />
						</Message>
					) : (
						<div className="ui segment">
							<QuoteForm submit={this.submit} />
						</div>
					)}
				</div>
			</div>
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

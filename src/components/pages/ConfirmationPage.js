import React from 'react';
import { Message, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends React.Component {
	state = {
		loading: true,
		success: false
	};

	componentDidMount() {
		this.props
			.confirm(this.props.match.params.token)
			.then(() => this.setState({ loading: false, success: true }))
			.catch(() => this.setState({ loading: false, success: false }));
	}

	render() {
		const { success, loading } = this.state;
		return (
			<Grid.Row centered>
				<Grid.Column mobile={16} computer={8} tablet={12}>
					{loading && (
						<Message icon>
							<Icon name="circle notched" loading />
							<Message.Header>Validating your email</Message.Header>
						</Message>
					)}
					{!loading &&
						success && (
							<Message success icon>
								<Icon name="checkmark" />
								<Message.Content>
									<Message.Header>
										Thank you. Your account has been verified.
									</Message.Header>
									<Link to="/dashboard">Go to your dashboard</Link>
								</Message.Content>
							</Message>
						)}
					{!loading &&
						!success && (
							<Message negative icon>
								<Icon name="warning sign" />
								<Message.Header>Oops! Invalid Token, it seems.</Message.Header>
							</Message>
						)}
				</Grid.Column>
			</Grid.Row>
		);
	}
}

ConfirmationPage.propTypes = {
	confirm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);

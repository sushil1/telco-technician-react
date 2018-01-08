import React from 'react';
import { Message, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPasswordRequest } from '../../actions/auth';
import { ForgotPasswordForm } from '../forms';

class ForgotPasswordPage extends React.Component {
	state = {
		success: false
	};

	submit = data =>
		this.props
			.resetPasswordRequest(data)
			.then(() => this.setState({ success: true }));

	render() {
		return (
			<Grid.Row centered>
				<Grid.Column mobile={16} computer={8} tablet={12}>
					{this.state.success ? (
						<Message>Email has been sent</Message>
					) : (
						<ForgotPasswordForm submit={this.submit} />
					)}
				</Grid.Column>
			</Grid.Row>
		);
	}
}

ForgotPasswordPage.propTypes = {
	resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);

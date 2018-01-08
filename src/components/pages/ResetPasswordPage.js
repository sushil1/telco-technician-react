import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ResetPasswordForm } from '../forms';
import { validateToken, resetPassword } from '../../actions/auth';

class ResetPasswordPage extends React.Component {
	state = {
		loading: true,
		success: false
	};

	componentDidMount() {
		this.props
			.validateToken(this.props.match.params.token)
			.then(() =>
				this.setState({
					loading: false,
					success: true
				})
			)
			.catch(() =>
				this.setState({
					loading: false,
					success: false
				})
			);
	}

	submit = data =>
		this.props
			.resetPassword(data)
			.then(() => this.props.history.push('/login'));

	render() {
		const { loading, success } = this.state;
		const { token } = this.props.match.params;
		return (
			<Grid.Row centered>
				<Grid.Column mobile={16} computer={8} tablet={12}>
					{loading && (
						<Message icon>
							<Icon name="circle notched" loading />
						</Message>
					)}
					{!loading &&
						success && (
							<Message>
								<Message.Header>Reset Password</Message.Header>
								<ResetPasswordForm submit={this.submit} token={token} />
							</Message>
						)}
					{!loading &&
						!success && (
							<Message icon>
								<Icon name="warning sign" />
								Invalid token
							</Message>
						)}
				</Grid.Column>
			</Grid.Row>
		);
	}
}

ResetPasswordPage.propTypes = {
	validateToken: PropTypes.func.isRequired,
	resetPassword: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

export default connect(null, { validateToken, resetPassword })(
	ResetPasswordPage
);

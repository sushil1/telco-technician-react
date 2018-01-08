import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginForm } from '../forms';
import { login } from '../../actions/auth';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
	submit = data =>
		this.props.login(data).then(() => this.props.history.push('/dashboard'));

	render() {
		return (
			<Grid.Row centered>
				<Grid.Column mobile={14} computer={8} tablet={10}>
					<Segment raised color="teal">
						<h4>Login Form</h4>

						<Divider />
						<LoginForm submit={this.submit} />
						<Segment inverted>
							<Link to="/forgot_password">Forgot Password?</Link>{' '}
							<span>New to Telco Technician!</span>{' '}
							<Link to="/signup">Sign Up</Link>
						</Segment>
					</Segment>
				</Grid.Column>
			</Grid.Row>
		);
	}
}

LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);

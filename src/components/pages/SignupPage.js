import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/users';
import { SignupForm } from '../forms';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SignupPage extends React.Component {
	submit = data =>
		this.props.signup(data).then(() => this.props.history.push('/dashboard'));

	render() {
		return (
			<Grid.Row centered>
				<Grid.Column mobile={14} computer={8} tablet={10}>
					<Segment raised color="teal">
						<h4>Signup Form</h4>
						<Divider />
						<SignupForm submit={this.submit} />
						<Segment inverted>
							<span>Already have an account!</span>{' '}
							<Link to="/login">Login</Link>
						</Segment>
					</Segment>
				</Grid.Column>
			</Grid.Row>
		);
	}
}

SignupPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);

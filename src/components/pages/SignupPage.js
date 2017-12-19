import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/users';
import { SignupForm } from '../forms';

class SignupPage extends React.Component {
	submit = data =>
		this.props.signup(data).then(() => this.props.history.push('/dashboard'));

	render() {
		return (
			<div className="ui grid">
				<div className="twelve wide column centered">
					<div className="ui segment">
						<SignupForm submit={this.submit} />
					</div>
				</div>
			</div>
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

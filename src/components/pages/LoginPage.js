import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginForm } from '../forms';
import { login } from '../../actions/auth';

class LoginPage extends React.Component {
	submit = data =>
		this.props.login(data).then(() => this.props.history.push('/dashboard'));

	render() {
		return (
			<div className="ui grid">
				<div className="twelve wide column centered">
					<div className="ui segment">
						<LoginForm submit={this.submit} />
					</div>
				</div>
			</div>
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

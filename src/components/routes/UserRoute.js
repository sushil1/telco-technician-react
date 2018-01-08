import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
		}
	/>
);

UserRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function stateToProps(state) {
	const currentUser = state.user.currentUser;
	return {
		isAuthenticated: !!currentUser.token
	};
}

export default connect(stateToProps, null)(UserRoute);

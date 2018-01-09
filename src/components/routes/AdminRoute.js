import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAdmin ? (
				<Component {...props} {...rest} isAdmin />
			) : (
				<Redirect to="/dashboard" />
			)
		}
	/>
);

AdminRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isAdmin: PropTypes.bool.isRequired	
};

function stateToProps(state) {
	const admin = state.user.currentUser.role === 'admin';
	return {
		isAdmin: !!admin
	};
}

export default connect(stateToProps, null)(AdminRoute);

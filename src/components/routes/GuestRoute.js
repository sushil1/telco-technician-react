import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
		}
	/>
);

GuestRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function stateToProps(state) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect(stateToProps, null)(GuestRoute);

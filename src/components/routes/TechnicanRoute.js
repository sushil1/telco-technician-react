import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const TechnicanRoute = ({ component: Component, isTechnician, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isTechnician ? (
				<Component {...props} {...rest} isTechnician />
			) : (
				<Redirect to="/dashboard" />
			)
		}
	/>
);

TechnicanRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isTechnician: PropTypes.bool.isRequired
};

function stateToProps(state) {
	const technician = state.user.currentUser.role === 'technician';
	return {
		isTechnician: !!technician
	};
}

export default connect(stateToProps, null)(TechnicanRoute);

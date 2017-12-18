import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConfirmEmailMessage } from '../messages';

const DashboardPage = ({ isConfirmed }) => (
	<div>{!isConfirmed && <ConfirmEmailMessage />}</div>
);

function stateToProps(state) {
	return {
		isConfirmed: !!state.user.confirmed
	};
}

DashboardPage.propTypes = {
	isConfirmed: PropTypes.bool.isRequired
};

export default connect(stateToProps, null)(DashboardPage);

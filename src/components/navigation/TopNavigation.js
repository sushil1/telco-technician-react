import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const TopNavigation = ({ isAuthenticated, logout }) => (
	<Menu pointing secondary>
		<Menu.Item as={NavLink} exact to="/">
			TelcoTechnician
		</Menu.Item>
		{isAuthenticated && (
			<Menu.Item as={NavLink} exact to="/dashboard">
				Dashboard
			</Menu.Item>
		)}
		<Menu.Item as={NavLink} exact to="/quote">
			Quick Quote
		</Menu.Item>
		<Dropdown text="Services" pointing className="link item">
			<Dropdown.Menu>
				<Dropdown.Item>ADSL</Dropdown.Item>
				<Dropdown.Item>MDF jumpering</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>

		{isAuthenticated ? (
			<Menu.Menu position="right">
				<Menu.Item as={NavLink} exact to="/" onClick={() => logout()}>
					Logout
				</Menu.Item>
			</Menu.Menu>
		) : (
			<Menu.Menu position="right">
				<Menu.Item as={NavLink} exact to="/login">
					Login
				</Menu.Item>
				<Menu.Item as={NavLink} exact to="/signup">
					Signup
				</Menu.Item>
			</Menu.Menu>
		)}
	</Menu>
);

function stateToProps(state) {
	return {
		isAuthenticated: !!state.user.token
	};
}

TopNavigation.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

export default connect(stateToProps, { logout: actions.logout })(TopNavigation);

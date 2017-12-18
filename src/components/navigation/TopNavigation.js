import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const TopNavigation = ({ isAuthenticated, logout }) => (
	<Menu>
		<Menu.Item>
			<NavLink to="/">TelcoTechnician</NavLink>
		</Menu.Item>
		<Menu.Item>
			<NavLink to="/book/quote">Quick Quote</NavLink>
		</Menu.Item>
		<Dropdown text="Services" pointing className="link item">
			<Dropdown.Menu>
				<Dropdown.Item>ADSL</Dropdown.Item>
				<Dropdown.Item>MDF jumpering</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>

		{isAuthenticated ? (
			<Menu.Menu position="right">
				<Menu.Item>
					<a href="" onClick={() => logout()}>
						Logout
					</a>
				</Menu.Item>
			</Menu.Menu>
		) : (
			<Menu.Menu position="right">
				<Menu.Item>
					<NavLink to="/login">Login</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/signup">Signup</NavLink>
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

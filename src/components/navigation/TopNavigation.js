import React from 'react';
import { Menu, Dropdown, Image, Header, Icon } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const showGravatar = currentUser => {
	if (currentUser.confirmed) {
		return currentUser.email;
	}
	return 'jpt@gmail.com';
};

const TopNavigation = ({ isAuthenticated, logout, currentUser }) => (
	<Menu inverted>
		<Menu.Item as={NavLink} exact to="/">
			<Header inverted>
				Telco-Technician <Icon name="settings" />
			</Header>
		</Menu.Item>

		{isAuthenticated && (
			<Menu.Item as={NavLink} exact to="/dashboard">
				Dashboard
			</Menu.Item>
		)}
		<Menu.Item as={NavLink} exact to="/services">
			Services
		</Menu.Item>
		<Menu.Item as={NavLink} exact to="/book">
			Book Us
		</Menu.Item>
		<Menu.Item as={NavLink} exact to="/quote">
			Quick Quote
		</Menu.Item>
		<Menu.Item as={NavLink} exact to="/faq">
			FAQ
		</Menu.Item>

		{isAuthenticated ? (
			<Menu.Menu position="right">
				<Dropdown
					trigger={
						<Image
							avatar
							src={gravatarUrl(showGravatar(currentUser))}
							style={{ marginTop: '10px' }}
						/>
					}>
					<Dropdown.Menu>
						<Dropdown.Item as={Link} to="/" onClick={() => logout()}>
							Logout
						</Dropdown.Item>
						<Dropdown.Item>Profile</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
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
	const user = state.user;
	return {
		isAuthenticated: !!user.currentUser.token,
		currentUser: user.currentUser
	};
}

TopNavigation.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	currentUser: PropTypes.shape({
		email: PropTypes.string,
		confirmed: PropTypes.bool
	}).isRequired
};

TopNavigation.defaultProps = {
	currentUser: {}
};

export default connect(stateToProps, { logout: actions.logout })(TopNavigation);

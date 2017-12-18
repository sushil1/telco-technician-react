import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => (
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
		<Menu.Menu position="right">
			<Menu.Item>
				<NavLink to="/login">Login</NavLink>
			</Menu.Item>
			<Menu.Item>
				<NavLink to="/signup">Signup</NavLink>
			</Menu.Item>
		</Menu.Menu>
	</Menu>
);

export default TopNavigation;

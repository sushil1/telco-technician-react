import React from 'react';
import { Menu, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Footer = () => (
	<Segment inverted vertical style={{ marginTop: '50px' }}>
		<Grid.Row>
			<Menu inverted={true}>
				<Menu.Item as={Link} to="/">
					<h4>Telco Technician</h4>
				</Menu.Item>
				<Menu.Item as={Link} to="/services">
					Services
				</Menu.Item>
				<Menu.Item as={Link} to="/quote">
					Quick Quote
				</Menu.Item>
			</Menu>
		</Grid.Row>
		<br />
		<br />
		<Grid.Row textAlign="center">
			<h4 className="ui inverted header">TelcoTechnician Pty. Ltd.</h4>
			<p>Book us for any telecom work.</p>
			<p>Currently serving at Sydney areas, nothern beaches.</p>
		</Grid.Row>
	</Segment>
);

export default Footer;

import React from 'react';
import { Menu, Grid, Segment, Icon } from 'semantic-ui-react';
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
				<Menu.Menu position='right'>
					<Menu.Item as={Link} target='_blank' to='https://www.facebook.com/telcotechnician/'>
						<Icon inverted name='facebook' size='large' />
					</Menu.Item>
					<Menu.Item >
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</Grid.Row>
		<br />

			<div style={{width:'60%', textAlign:'center', margin:'auto'}}>
			<h4 className="ui inverted header">TelcoTechnician Pty. Ltd.</h4>
			<p>Book us for any telecom work.</p>
			<p>Currently serving at Sydney areas, nothern beaches.</p>
			<p>&copy;TelcoTechnician Pty. Ltd, 2018</p>
			</div>

	</Segment>
);

export default Footer;

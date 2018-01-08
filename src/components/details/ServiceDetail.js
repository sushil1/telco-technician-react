import React from 'react';
import { Header, Divider, Icon, Grid, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ServiceDetail = ({ service }) => (
	<Grid.Column mobile={16} tablet={8} computer={8}>
		<Header as="h2">
			<Header.Content>{service.name}</Header.Content>
		</Header>
		<Button animated tabIndex="0" as={Link} to={`/book/${service._id}`}>
			<div className="visible content">Book a technician</div>
			<div className="hidden content">{service.name}</div>
		</Button>
		<Header sub>Description</Header>
		<Divider />
		<p>{service.description}</p>
		<Header sub>Whats included</Header>
		<Divider />
		<List>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 2
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 3
			</List.Item>
		</List>

		<Header sub>Usual Issues</Header>
		<Divider />
		<List>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 2
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 3
			</List.Item>
		</List>

		<Header sub>What we need</Header>
		<Divider />
		<List>
			<List.Item>
				<Icon name="right triangle" />
				Might need to access your home
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Might need to access your roof
			</List.Item>
			<List.Item>
				<Icon name="right triangle" />
				Inline Text 3
			</List.Item>
		</List>
		<Header sub>Our stats</Header>
		<Divider />
	</Grid.Column>
);

export default ServiceDetail;

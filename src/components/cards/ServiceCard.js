import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image, Grid } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import truncateText from '../../utils/truncateText';

const ServiceCard = ({ service }) => (
	<Grid.Column mobile={16} tablet={5} computer={4}>
		<Card raised as={Link} to={`/services/${service._id}`} centered
			style={{ margin:'auto'}}
		>
			<Image src="http://via.placeholder.com/200x200" />
			<Card.Content>
				<Card.Header>{service.name}</Card.Header>
				<Card.Description>
					{truncateText(service.description, 110)}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Icon name="dollar" />
				{service.cost}
				<span className="right floated">
					<Icon name="time" />
					{service.time} min
				</span>
			</Card.Content>
		</Card>
	</Grid.Column>
);

ServiceCard.propTypes = {
	service: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired
	}).isRequired
};

export default ServiceCard;

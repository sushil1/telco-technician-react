import React from 'react';
import PropTypes from 'prop-types';
import { ServiceCard } from '../cards';
import { Grid } from 'semantic-ui-react';

const ServicesList = ({ services }) => (
	<Grid style={{marginTop:'15px'}}>
		{Object.keys(services).map((key, val) => (
			<ServiceCard key={key} service={services[key]} />
		))}
	</Grid>
);

ServicesList.propTypes = {
	services: PropTypes.shape({}).isRequired
};

ServicesList.defaultProps = {
	services: {}
};

export default ServicesList;

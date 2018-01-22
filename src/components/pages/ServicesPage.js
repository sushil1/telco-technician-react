import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAll } from '../../actions/services';
import { ServicesList } from '../lists';
import Loader from 'react-loader'
import {Message} from 'semantic-ui-react'

class ServicesPage extends React.Component {


	componentDidMount() {
		if (Object.keys(this.props.services).length === 0) {
			this.props.fetchAll()
		}
	}

	render() {
		const {loaded, services} = this.props
		return (
			<div>
				<Loader loaded={loaded}>
					{Object.keys(services).length === 0 && <Message>Error fetching services. Try Again.</Message> }
					<ServicesList services={services} />
				</Loader>
			</div>
		);
	}
}

function stateToProps(state) {
	return {
		services: state.service.list,
		loaded: state.service.loaded
	};
}

ServicesPage.propTypes = {
	services: PropTypes.shape({}).isRequired,
	fetchAll: PropTypes.func.isRequired
};

ServicesPage.defaultProps = {
	services: {}
};

export default connect(stateToProps, { fetchAll })(ServicesPage);

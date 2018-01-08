import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { fetchAll } from '../../actions/services';
import { ServicesList } from '../lists';

class ServicesPage extends React.Component {
	state = {
		loading: true
	};

	componentDidMount() {
		if (Object.keys(this.props.services).length === 0) {
			this.props.fetchAll().then(() => this.setState({ loading: false }));
		} else {
			this.setState({ loading: false });
		}
	}

	render() {
		return (
			<div>
				{this.state.loading ? (
					<Message icon>
						<Icon name="circle notched" loading />
						Loading services
					</Message>
				) : (
					<ServicesList services={this.props.services} />
				)}
			</div>
		);
	}
}

function stateToProps(state) {
	return {
		services: state.service.list
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

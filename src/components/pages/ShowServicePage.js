import React from 'react';
import { Message, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchById, serviceSelected } from '../../actions/services';
import { ServiceDetail } from '../details';

class ShowServicePage extends React.Component {
	state = {
		loading: true,
		service: {}
	};

	componentDidMount() {
		if (Object.keys(this.props.service).length === 0) {
			this.props.fetchById(this.props.match.params._id).then(item =>
				this.setState({
					loading: false,
					service: item.service
				})
			);
		} else {
			const service = this.props.service[this.props.match.params._id];
			this.props.serviceSelected(service);
			this.setState({
				loading: false,
				service: service
			});
		}
	}

	render() {
		const { loading } = this.state;
		return (
			<Grid container>
				{loading ? (
					<Message icon>
						<Icon name="circle notched" loading />
					</Message>
				) : (
					<ServiceDetail
						service={this.state.service}
						location={this.props.location}
					/>
				)}
			</Grid>
		);
	}
}

function stateToProps(state) {
	return {
		service: state.service.list
	};
}

export default connect(stateToProps, { fetchById, serviceSelected })(
	ShowServicePage
);

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

	fetchService = (id) => {
		if (Object.keys(this.props.service).length === 0) {
			this.props.fetchById(id).then(item =>{
				this.props.serviceSelected(item.service)
				this.setState({
					loading: false,
					service: item.service
				})
			})
		} else {
			const service = this.props.service[id];
			this.props.serviceSelected(service);
			this.setState({
				loading: false,
				service: service
			});
		}
	}

	componentDidMount() {
		this.fetchService(this.props.match.params._id)
	}

	componentWillReceiveProps(nextProps){
		if(this.props.match.params._id !== nextProps.match.params._id){
			this.fetchService(nextProps.match.params._id)
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { ConfirmEmailMessage } from '../messages';
import {
	BookingList,
	QuoteList,
	TicketList,
	MyTicketList,
	UserList
} from '../lists';
import {ProfilePage} from '../pages'
import { fetchAll } from '../../actions/services';
import { AdminRoute, TechnicanRoute, UserRoute } from '../routes';

class DashboardPage extends React.Component {
	componentDidMount() {
		if (this.props.serviceOptions.length === 0) {
			this.props.fetchAll();
		}
	}

	render() {
		const { isConfirmed, isAdmin, isTechnician } = this.props;
		return (
			<Grid>
				<Grid.Row centered>
					<Grid.Column width={16}>
						{!isConfirmed && <ConfirmEmailMessage />}
						{!isAdmin &&
							!isTechnician && (
								<Menu>
									<Menu.Item as={NavLink} exact to="/dashboard/myquotes">
										My Quotes
									</Menu.Item>
									<Menu.Item as={NavLink} exact to="/dashboard/mybookings">
										My Bookings
									</Menu.Item>
									<Menu.Item as={NavLink} exact to="/dashboard/me">
										Profile
									</Menu.Item>
								</Menu>
							)}
						{isTechnician && (
							<Menu>
								<Menu.Item>
									<h2>TECHNICIAN</h2>
								</Menu.Item>
								<Menu.Item as={NavLink} exact to="/dashboard/mytickets">
									My Tickets
								</Menu.Item>
								<Menu.Item as={NavLink} exact to="/dashboard/me">
									Profile
								</Menu.Item>
							</Menu>
						)}
						{isAdmin && (
							<Menu compact icon="labeled">
								<Menu.Item as={NavLink} exact to="/dashboard/admin/quotes">
									Quotes
									<Icon name="comments" />
								</Menu.Item>
								<Menu.Item as={NavLink} exact to="/dashboard/admin/bookings">
									Bookings
									<Icon name="tasks" />
								</Menu.Item>
								<Menu.Item as={NavLink} exact to="/dashboard/admin/tickets">
									Tickets
									<Icon name="ticket" />
								</Menu.Item>
								<Menu.Item as={NavLink} exact to="/dashboard/admin/users">
									Users
									<Icon name="users" />
								</Menu.Item>
								<Menu.Item as={NavLink} exact to="/dashboard/me">
									Profile
								</Menu.Item>
							</Menu>
						)}
					</Grid.Column>

					<Grid.Column width={16}>
						<AdminRoute
							path="/dashboard/admin/bookings"
							component={BookingList}
							serviceOptions={this.props.serviceOptions}
							location={this.props.location}
						/>
						<AdminRoute
							path="/dashboard/admin/tickets"
							component={TicketList}
							serviceOptions={this.props.serviceOptions}
							location={this.props.location}
						/>
						<AdminRoute
							path="/dashboard/admin/quotes"
							component={QuoteList}
							serviceOptions={this.props.serviceOptions}
							location={this.props.location}
						/>
						<AdminRoute
							path="/dashboard/admin/users"
							component={UserList}
							location={this.props.location}
						/>

						<TechnicanRoute
							path="/dashboard/mytickets"
							component={MyTicketList}
							location={this.props.location}
							serviceOptions={this.props.serviceOptions}
						/>
						<UserRoute
							path="/dashboard/me"
							component={ProfilePage}
							location={this.props.location}
						/>

					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

function stateToProps(state) {
	const service = state.service.list;
	const options = Object.values(service).map(item => ({
		key: item._id,
		value: item._id,
		text: item.name
	}));
	const admin = state.user.currentUser
		? state.user.currentUser.role === 'admin'
		: false;
	const technician = state.user.currentUser
		? state.user.currentUser.role === 'technician'
		: false;
	return {
		isConfirmed: !!state.user.currentUser.confirmed,
		serviceOptions: options,
		isAdmin: !!admin,
		isTechnician: !!technician
	};
}

DashboardPage.propTypes = {
	isConfirmed: PropTypes.bool.isRequired,
	fetchAll: PropTypes.func
};

export default connect(stateToProps, { fetchAll })(DashboardPage);

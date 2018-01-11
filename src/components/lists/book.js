//havent used this file, just looking for possible ui //design rather than react-table 


// import React from 'react';
// import { Table, Button } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// import { fetchAllBookings } from '../../actions/bookings';
//
// class BookingList extends React.Component {
// 	state = {
// 		loading: true
// 	};
// 	componentDidMount() {
// 		this.props.fetchAllBookings().then(() => this.setState({ loading: false }));
// 	}
// 	render() {
// 		const { bookings } = this.props;
// 		return (
// 			<Table celled>
// 				<Table.Header>
// 					<Table.Row>
// 						<Table.HeaderCell>Name</Table.HeaderCell>
// 						<Table.HeaderCell>Status</Table.HeaderCell>
// 						<Table.HeaderCell>Mobile</Table.HeaderCell>
// 						<Table.HeaderCell>Service</Table.HeaderCell>
// 						<Table.HeaderCell>Email</Table.HeaderCell>
// 						<Table.HeaderCell>Address</Table.HeaderCell>
// 						<Table.HeaderCell>Appointment</Table.HeaderCell>
// 						<Table.HeaderCell>Message</Table.HeaderCell>
// 						<Table.HeaderCell>Comment</Table.HeaderCell>
// 						<Table.HeaderCell>Actions</Table.HeaderCell>
// 					</Table.Row>
// 				</Table.Header>
//
// 				<Table.Body>
// 					{Object.values(bookings).map(item => (
// 						<Table.Row key={item._id}>
// 							<Table.Cell>{item.name}</Table.Cell>
// 							<Table.Cell>Approved</Table.Cell>
// 							<Table.Cell>{item.mobile}</Table.Cell>
// 							<Table.Cell>{item.service['name']}</Table.Cell>
// 							<Table.Cell>{item.email}</Table.Cell>
// 							<Table.Cell>{item.address}</Table.Cell>
// 							<Table.Cell>{item.date}</Table.Cell>
// 							<Table.Cell>{item.message}</Table.Cell>
// 							<Table.Cell>{item.comment}</Table.Cell>
// 							<Table.Cell>
// 								<Button.Group>
// 									<Button basic color="green">
// 										Edit
// 									</Button>
// 									<Button basic color="red">
// 										Delete
// 									</Button>
// 								</Button.Group>
// 							</Table.Cell>
// 						</Table.Row>
// 					))}
// 				</Table.Body>
// 			</Table>
// 		);
// 	}
// }
//
// function stateToProps(state) {
// 	return {
// 		bookings: state.booking
// 	};
// }
//
// export default connect(stateToProps, { fetchAllBookings })(BookingList);

import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { CreateTicketPage } from '../pages';
import {
	fetchAllBookings,
	updateBooking,
	deleteBooking
} from '../../actions/bookings';

import 'react-table/react-table.css';

class BookingList extends React.Component {
	state = {
		loading: true,
		data: {},
		sorted: [],
		page: 0,
		pageSize: 10,
		expanded: {},
		resized: [],
		filtered: [],
		showModal: false,
		ticketData: {}
	};

	componentDidMount() {
		this.props
			.fetchAllBookings()
			.then(() => this.setState({ loading: false, data: this.props.bookings }));
	}

	componentWillReceiveProps(nextProps) {
		this.props.bookings !== nextProps.bookings &&
			this.setState({ data: nextProps.bookings });
	}

	showTicketForm = id => {
		if (!this.props.bookings[id]['proceedToTicket']) {
			const selectedData = { ...this.state.data[id] };
			selectedData['bookingId'] = id;
			delete selectedData['createdAt'];
			delete selectedData['_id'];

			this.setState({
				ticketData: { ...selectedData },
				showModal: true
			});
		}
	};

	hideTicketForm = () =>
		this.setState({
			showModal: false
		});

	updateBooking = (id, args) => {
		this.props.updateBooking(id, args);
	};

	handleDelete = id => {
		this.props.deleteBooking(id);
	};

	renderEditable = cellInfo => {
		return (
			<div
				style={{ backgroundColor: '#fafafa' }}
				contentEditable
				suppressContentEditableWarning
				onBlur={e => {
					// const data = this.state.data;
					// data[cellInfo.original._id][cellInfo.column.id] = e.target.innerHTML;
					//this.setState({ data });
					if (
						cellInfo.original[cellInfo.column.id] !== e.target.innerHTML.trim()
					) {
						this.updateBooking(cellInfo.original._id, {
							[cellInfo.column.id]: e.target.innerHTML.trim()
						});
					}
				}}>
				{cellInfo.value}
			</div>
		);
	};

	render() {
		const data = Object.values(this.state.data);
		const columns = [
			{
				Header: 'Name',
				accessor: 'name',
				Cell: this.renderEditable
			},
			{
				Header: 'Address',
				accessor: 'address',
				Cell: this.renderEditable
			},
			{
				Header: 'Email',
				accessor: 'email',
				Cell: this.renderEditable
			},
			{
				Header: 'Mobile',
				accessor: 'mobile',
				Cell: this.renderEditable
			},
			{
				Header: 'Appointment',
				accessor: 'date',
				Cell: this.renderEditable
			},
			{
				Header: 'Message',
				accessor: 'message',
				Cell: this.renderEditable
			},
			{
				Header: 'Service',
				accessor: 'service.name'
			},
			{
				Header: 'BookedAt',
				accessor: 'createdAt'
			},
			{
				Header: 'Make a Ticket',
				Cell: row => (
					<Button
						basic
						color="green"
						onClick={() => this.showTicketForm(row.original._id)}>
						{this.state.data[row.original._id].proceedToTicket
							? 'TOW'
							: 'Ticket It'}
					</Button>
				)
			},
			{
				Header: 'Action',
				Cell: row => (
					<Button
						basic
						color="red"
						onClick={() => this.handleDelete(row.original._id)}>
						Delete
					</Button>
				)
			}
		];
		return (
			<div>
				{this.state.showModal && (
					<CreateTicketPage
						ticketData={this.state.ticketData}
						hideTicketForm={this.hideTicketForm}
						serviceOptions={this.props.serviceOptions}
					/>
				)}
				<Segment raised color="teal">
					<ReactTable
						defaultPageSize={20}
						data={data}
						columns={columns}
						filterable
						className="-striped -highlight"
						style={{
							height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
						}}
						// Controlled props
						sorted={this.state.sorted}
						page={this.state.page}
						pageSize={this.state.pageSize}
						expanded={this.state.expanded}
						resized={this.state.resized}
						filtered={this.state.filtered}
						//callbacks
						onSortedChange={sorted => this.setState({ sorted })}
						onPageChange={page => this.setState({ page })}
						onPageSizeChange={(pageSize, page) =>
							this.setState({ page, pageSize })
						}
						onExpandedChange={expanded => this.setState({ expanded })}
						onResizedChange={resized => this.setState({ resized })}
						onFilteredChange={filtered => this.setState({ filtered })}
					/>
				</Segment>
			</div>
		);
	}
}

function stateToProps(state) {
	return {
		bookings: state.booking
	};
}

export default connect(stateToProps, {
	fetchAllBookings,
	updateBooking,
	deleteBooking
})(BookingList);

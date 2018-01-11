import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Button, Segment, Message } from 'semantic-ui-react';
import { CreateTicketPage } from '../pages';
import { fetchAllQuotes, updateQuote, deleteQuote } from '../../actions/quotes';

import 'react-table/react-table.css';

class QuoteList extends React.Component {
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
			.fetchAllQuotes()
			.then(() => this.setState({ loading: false, data: this.props.quotes }));
	}

	componentWillReceiveProps(nextProps) {
		this.props.quotes !== nextProps.quotes &&
			this.setState({ data: nextProps.quotes });
	}

	updateQuote = (id, args) => {
		this.props.updateQuote(id, args);
	};

	showTicketForm = id => {
		if (!this.props.quotes[id]['proceedToTicket']) {
			const selectedData = { ...this.state.data[id] };
			selectedData['quoteId'] = id;
			selectedData['service'] = null;
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

	handleDelete = id => {
		this.props.deleteQuote(id);
		// this.setState({
		// 	data: _.omit(this.state.data, id)
		// });
	};

	renderEditable = cellInfo => {
		return (
			<div
				style={{ backgroundColor: '#fafafa' }}
				contentEditable
				suppressContentEditableWarning
				onBlur={e => {
					const data = this.state.data;
					data[cellInfo.original._id][cellInfo.column.id] = e.target.innerHTML;
					console.log(cellInfo);
					this.setState({ data });
					this.updateQuote(cellInfo.original._id, {
						[cellInfo.column.id]: e.target.innerHTML
					});
				}}>
				{cellInfo.value}
			</div>
		);
	};

	render() {
		const data = Object.values(this.state.data);
		const noResourceMessage = (
			<Message>
				<Message.Content>No Resources found</Message.Content>
			</Message>
		);

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
				Header: 'Contact',
				accessor: 'mobile',
				Cell: this.renderEditable
			},
			{
				Header: 'Message',
				accessor: 'message',
				Cell: this.renderEditable
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

				<Segment>
					<Button
						content="Create New"
						icon="add"
						color="teal"
						labelPosition="right"
					/>

					<Button
						content="Find"
						icon="search"
						color="teal"
						labelPosition="right"
					/>
				</Segment>

				<Segment raised color="teal">
					{data.length === 0 ? (
						noResourceMessage
					) : (
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
					)}
				</Segment>
			</div>
		);
	}
}

function stateToProps(state) {
	return {
		quotes: state.quote
	};
}

export default connect(stateToProps, {
	fetchAllQuotes,
	updateQuote,
	deleteQuote
})(QuoteList);

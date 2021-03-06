import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { CreateTicketPage } from '../pages';
import {
  fetchAllTickets,
  updateTicket,
  deleteTicket
} from '../../actions/tickets';
import MyTicketList from './MyTicketList';

import 'react-table/react-table.css';

class TicketList extends React.Component {
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
    ticketData: {},
    cardListView: false
  };

  componentDidMount() {
    this.props
      .fetchAllTickets()
      .then(() => this.setState({ loading: false, data: this.props.tickets }));
  }

  componentWillReceiveProps(nextProps) {
    this.props.tickets !== nextProps.tickets &&
      this.setState({ data: nextProps.tickets });
  }

  showUpdateTicketForm = id => {
    const selectedData = { ...this.state.data[id] };
    this.setState({
      ticketData: { ...selectedData },
      showModal: true
    });
  };

  hideTicketForm = () =>
    this.setState({
      showModal: false
    });

  updateTicket = (id, args) => {
    this.props.updateTicket(id, args);
  };

  handleDelete = id => {
    this.props.deleteTicket(id);
  };

  toggleCardView = () =>
    this.setState({
      cardListView: !this.state.cardListView
    });

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
            this.updateTicket(cellInfo.original._id, {
              [cellInfo.column.id]: e.target.innerHTML.trim()
            });
          }
        }}
      >
        {cellInfo.value}
      </div>
    );
  };

  render() {
    const data = Object.values(this.state.data);
    const columns = [
      {
        Header: 'Cust_Name',
        accessor: 'name',
        Cell: this.renderEditable
      },
      {
        Header: 'Cust_Address',
        accessor: 'address',
        Cell: this.renderEditable
      },
      // {
      // 	Header: 'Cust_Email',
      // 	accessor: 'email',
      // 	Cell: this.renderEditable
      // },
      {
        Header: 'Cust_Mobile',
        accessor: 'mobile',
        Cell: this.renderEditable
      },
      {
        Header: 'Appointment',
        accessor: 'date',
        Cell: this.renderEditable
      },
      // {
      // 	Header: 'Message',
      // 	accessor: 'message',
      // 	Cell: this.renderEditable
      // },
      {
        Header: 'Service',
        accessor: 'service.name'
      },
      {
        Header: 'Job Status',
        accessor: 'jobStatus.name'
      },
      {
        Header: 'AssignedTo',
        accessor: 'assignedStaff.name'
      },
      // {
      // 	Header: 'Cost',
      // 	accessor: 'cost'
      // },
      // {
      // 	Header: 'Notes',
      // 	accessor: 'notes'
      // },
      {
        Header: 'Payment',
        accessor: 'paymentStatus.name'
      },
      {
        Header: 'Update',
        Cell: row => (
          <Button
            basic
            color="green"
            onClick={() => this.showUpdateTicketForm(row.original._id)}
          >
            Update
          </Button>
        )
      },
      {
        Header: 'Action',
        Cell: row => (
          <Button
            basic
            color="red"
            onClick={() => this.handleDelete(row.original._id)}
          >
            Archive
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

        <Button
          content="Create New"
          icon="add"
          color="teal"
          labelPosition="right"
          onClick={() => this.showUpdateTicketForm(null)}
        />

        <Button
          content={this.state.cardListView ? 'Show Table' : 'Show Cards'}
          icon="list"
          color="teal"
          labelPosition="right"
          onClick={this.toggleCardView}
        />

        {this.state.cardListView && (
          <MyTicketList isAdmin={this.props.isAdmin} />
        )}
        {!this.state.cardListView && (
          <div>
            <ReactTable
              defaultPageSize={20}
              data={data}
              columns={columns}
              filterable
              className="-striped -highlight"
              style={{
                height: '800px'
                // This will force the table body to overflow and scroll, since there is not enough room
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
          </div>
        )}
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    tickets: state.ticket
  };
}

export default connect(stateToProps, {
  fetchAllTickets,
  updateTicket,
  deleteTicket
})(TicketList);

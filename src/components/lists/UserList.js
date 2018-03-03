import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Button, Message } from 'semantic-ui-react';
import { fetchAllUsers, updateUser, deleteUser } from '../../actions/users';

import 'react-table/react-table.css';

class UserList extends React.Component {
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
      .fetchAllUsers()
      .then(() => this.setState({ loading: false, data: this.props.users }));
  }

  componentWillReceiveProps(nextProps) {
    this.props.users !== nextProps.users &&
      this.setState({ data: nextProps.users });
  }

  updateUser = (id, args) => {
    this.props.updateUser(id, args);
  };

  handleDelete = id => {
    this.props.deleteUser(id);
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
            this.updateUser(cellInfo.original._id, {
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
        Header: 'Name',
        accessor: 'name',
        Cell: this.renderEditable
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Confirmed',
        accessor: 'confirmed',
        Cell: row => (row.original.confirmed ? 'Yes' : 'No')
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
        Cell: this.renderEditable
      },

      {
        Header: 'Role',
        accessor: 'role'
      },

      {
        Header: 'Action',
        Cell: row => (
          <Button
            basic
            color="red"
            onClick={() => this.handleDelete(row.original._id)}
          >
            Delete
          </Button>
        )
      }
    ];

    const { noResourceMessage } = (
      <Message>
        <Message.Content>No Resources found</Message.Content>
      </Message>
    );

    return (
      <div>
        {data.length === 0 ? (
          <div>{noResourceMessage}</div>
        ) : (
          <ReactTable
            defaultPageSize={20}
            data={data}
            columns={columns}
            filterable
            className="-striped -highlight"
            style={{
              height: '800px' // This will force the table body to overflow and scroll, since there is not enough room
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
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    users: state.user.userList
  };
}

export default connect(stateToProps, {
  fetchAllUsers,
  updateUser,
  deleteUser
})(UserList);

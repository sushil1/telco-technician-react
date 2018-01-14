import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
	Button,
	Segment,
	Card,
	Icon,
	Accordion,
	Popup, Grid, Label
} from 'semantic-ui-react';
import { CreateTicketPage } from '../pages';
import {
	fetchAllTickets,
	updateTicket,
	deleteTicket,
	acceptTicket,
	declineTicket
} from '../../actions/tickets';

class MyTicketList extends React.Component {
	state = {
		loading: true,
		data: {},
		error: {},
		activeIndex: -1,
		popOverloading: false,
		ticketData: {}
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

	handleClick = (e, props) => {
		if (props.index === this.state.activeIndex) {
			this.setState({ activeIndex: -1 });
		} else {
			this.setState({ activeIndex: props.index });
		}
	};

	acceptTicket = ticketId => {
		this.setState({
			popOverloading: true
		});
		 this.props.acceptTicket(ticketId).then(() =>
			this.setState({
				popOverloading: false
			}))

	};
	declineTicket = id => {
		this.props.declineTicket(id).then(() => this.props.fetchAllTickets())

	};

	hideTicketForm = () =>
		this.setState({
			showModal: false
		});

	updateTicket = (id, args) => {
		this.props.updateTicket(id, args);
	};

	renderLabel(data){
		let colorName;
		let iconName;
			switch(data){
				case 'assigned':
				return {
					colorName:'teal',
					iconName:'user'
				}
				case 'on the way':
				return {
					colorName:'green',
					iconName:'road'
				}
				case 'at the site':
				return {
					colorName:'olive',
					iconName:'home'
				}
				case 'completed':
				return {
					colorName:'blue',
					iconName:'checkmark'
				}
				case 'incomplete':
				return {
					colorName:'black',
					iconName:'close'
				}
				case 'cancelled':
				return {
					colorName:'red',
					iconName:'close'
				}
				case 'postponed':
				return {
					colorName:'grey',
					iconName:'wait'
				}


				default:
				return {
					colorName:'grey',
					iconName:'lab'
				}
			}
	}



	render() {
		const tickets = Object.values(this.state.data);
		const { loading, activeIndex, popOverloading } = this.state;
		console.log(this.props)
		const TicketLabel = ({colorName, iconName}) => (
			<Label corner='right' color={colorName}><Icon name={iconName} /></Label>
		)


		return (
			<div>
				{this.state.showModal && (
					<CreateTicketPage
						ticketData={this.state.ticketData}
						hideTicketForm={this.hideTicketForm}
						serviceOptions={this.props.serviceOptions}
					/>
				)}


				<Segment raised color="teal" loading={loading} centered>

					<Card.Group stackable style={{marginTop:'20px'}}>
						{tickets.map((ticket, i) => (
							<Card key={ticket._id} color="brown" centered>
								<Card.Content>
									<Card.Header>{ticket.name}

									</Card.Header>

									<TicketLabel {...this.renderLabel(ticket.jobStatus.name)}/>

									<Card.Content>{ticket.service.name}</Card.Content>
									<Card.Meta>
				            <Icon name="clock" />
				            {moment(ticket.date).startOf('day').fromNow()}
				          </Card.Meta>
									<Card.Meta>

										<Icon name="mobile" />
										{ticket.mobile}
									</Card.Meta>
									<Card.Meta>
										<Icon name="marker" />
										{ticket.address}
									</Card.Meta>
									<Card.Meta>
										<Icon name="calendar" />
										{moment(ticket.date).format('MMMM Do YYYY, h:mm:ss a')}
									</Card.Meta>


									{this.props.isAdmin && <Label as='a' ribbon color='orange'>{ticket.assignedStaff.email}</Label>}
								</Card.Content>

								<Card.Content extra>
									<Card.Description>
										<Accordion>
											<Accordion.Title
												active={activeIndex === i}
												index={i}
												onClick={this.handleClick}>
												<Icon name="dropdown" />
												Messages & Notes
											</Accordion.Title>
											<Accordion.Content active={activeIndex === i}>
												<p>
													<strong>Message:</strong> {ticket.message}
												</p>
												<p>
													<strong>Notes:</strong> {ticket.notes}
												</p>
											</Accordion.Content>
										</Accordion>
									</Card.Description>
								</Card.Content>
								<Card.Content extra>

									<div className="ui two buttons">

									{this.props.isAdmin	? (<Button color='teal' onClick={() => this.showUpdateTicketForm(ticket._id)}>
									Update</Button>) : (

											(ticket.acceptedBy.indexOf(ticket.assignedStaff._id) !== -1) ? (
												<Button color='teal' onClick={() => this.showUpdateTicketForm(ticket._id)}>
												Update</Button>
											) : (
												<div className="ui two buttons">
												<Popup
													trigger={<Button basic content="Accept" color="green" />}
													on="click">
													<Grid divided columns="equal">
														<Grid.Column>
															<Button
																color="green"
																content="Yes"
																loading={popOverloading}
																onClick={() =>this.acceptTicket(ticket._id)}
															/>
														</Grid.Column>
														<Grid.Column>
															<Button color="grey" content="No" fluid />
														</Grid.Column>
													</Grid>
												</Popup>
												<Popup
													trigger={<Button content="Decline" color="red" basic />}
													on="click">
													<Grid divided columns="equal">
														<Grid.Column>
															<Button
																color="green"
																content="Yes"
																onClick={() => this.declineTicket(ticket._id)}
															/>
														</Grid.Column>
														<Grid.Column>
															<Button color="grey" content="No" fluid />
														</Grid.Column>
													</Grid>
												</Popup>
												</div>
											)
									)}








									</div>
								</Card.Content>
							</Card>
						))}
					</Card.Group>

				</Segment>
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
	deleteTicket,
	acceptTicket,
	declineTicket
})(MyTicketList);

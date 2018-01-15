import api from '../api';
import {
	TICKET_CREATED,
	TICKETS_FETCHED,
	TICKET_UPDATED,
	TICKET_DELETED
} from '../constants';

export const ticketCreated = ticket => ({
	type: TICKET_CREATED,
	ticket
});

export const createTicket = data => dispatch =>
	api.ticket.create(data).then(ticket => dispatch(ticketCreated(ticket)));


export const acceptTicket = ticketId => dispatch =>
		api.ticket.acceptTicket(ticketId).then(ticket => dispatch(ticketUpdated(ticket)));

		export const declineTicket = ticketId => () =>
				api.ticket.declineTicket(ticketId)

export const fetchAllTickets = params => dispatch =>
	api.ticket
		.fetchAll(params)
		.then(tickets => dispatch(ticketsFetched(tickets)));

export const updateTicket = (id, args) => dispatch =>
	api.ticket.update(id, args).then(ticket => dispatch(ticketUpdated(ticket)));

export const ticketsFetched = tickets => ({
	type: TICKETS_FETCHED,
	tickets
});

export const ticketUpdated = ticket => ({
	type: TICKET_UPDATED,
	ticket
});

export const ticketDeleted = id => ({
	type: TICKET_DELETED,
	id
});

export const deleteTicket = id => dispatch =>
	api.ticket.delete(id).then(id => dispatch(ticketDeleted(id)));


export const trackBooking = (refrenceId, mobile) => dispatch =>
api.ticket.trackBooking(refrenceId, mobile)

import {
	TICKET_CREATED,
	TICKETS_FETCHED,
	TICKET_UPDATED,
	TICKET_DELETED,
	USER_LOGGED_OUT
} from '../constants';

const initialState = {};

export default (state = initialState, action = {}) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case TICKETS_FETCHED:
			updated = action.tickets;
			return updated;

		case TICKET_CREATED:
		case TICKET_UPDATED:
			updated[action.ticket._id] = action.ticket;
			return { ...updated };

		case TICKET_DELETED:
			delete updated[action.id];
			return updated;

		case USER_LOGGED_OUT:
			updated = {};
			return updated;

		default:
			return state;
	}
};

import {
	TICKET_CREATED,
	TICKETS_FETCHED,
	TICKET_UPDATED,
	TICKET_DELETED,
	USER_LOGGED_OUT
} from '../constants';
import _ from 'lodash'

const initialState = {};

export default (state = initialState, action) => {

	switch (action.type) {
		case TICKETS_FETCHED:
			return {...state, ...action.tickets}

			//incase tickets come as an array, we would need to use
			// const newPosts = _.mapKeys(action.payload, '_id')
			// return {...state, ...newPosts}

		case TICKET_CREATED:
		case TICKET_UPDATED:
			return { ...state, [action.ticket._id]: action.ticket };

		case TICKET_DELETED:
			return _.omit(state, action.id)

		case USER_LOGGED_OUT:
			return {}

		default:
			return state;
	}
};

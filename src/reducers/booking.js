import {
	BOOKING_CREATED,
	BOOKINGS_FETCHED,
	BOOKING_UPDATED,
	BOOKING_DELETED
} from '../constants';

const initialState = {};

export default (state = initialState, action = {}) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case BOOKINGS_FETCHED:
			updated = action.bookings;
			return updated;

		case BOOKING_CREATED:
		case BOOKING_UPDATED:
			updated[action.booking._id] = action.booking;
			return updated;

		case BOOKING_DELETED:
			delete updated[action.id];
			return updated;

		default:
			return state;
	}
};

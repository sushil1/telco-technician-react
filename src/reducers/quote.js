import {
	QUOTE_CREATED,
	QUOTES_FETCHED,
	QUOTE_UPDATED,
	QUOTE_DELETED,
	USER_LOGGED_OUT
} from '../constants';

const initialState = {};

export default (state = initialState, action = {}) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case QUOTES_FETCHED:
			updated = action.quotes;
			return updated;

		case QUOTE_CREATED:
		case QUOTE_UPDATED:
			const newQuote = action.quote;
			updated[newQuote._id] = action.quote;
			return updated;

		case QUOTE_DELETED:
			delete updated[action.id];
			return updated;

			case USER_LOGGED_OUT:
				return {}

		default:
			return state;
	}
};

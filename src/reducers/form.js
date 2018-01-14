import {
	STAFF_OPTIONS_FETCHED,
	JOB_STATUS_OPTIONS_FETCHED,
	PAYMENT_OPTIONS_FETCHED
} from '../constants';

const initalState = {
};

export default (state = initalState, action = {}) => {
	switch (action.type) {
		case STAFF_OPTIONS_FETCHED:
			return { ...state, staffOptions: action.options };

		case JOB_STATUS_OPTIONS_FETCHED:
			return { ...state, jobStatusOptions: action.options };

		case PAYMENT_OPTIONS_FETCHED:
			return { ...state, paymentOptions: action.options };


		default:
			return state;
	}
};

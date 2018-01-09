import {
	USER_LOGGED_IN,
	USER_LOGGED_OUT,
	USERS_FETCHED,
	USER_DELETED,
	USER_UPDATED,
	CURRENT_USER_FETCHED
} from '../constants';

const initalState = {
	loaded:false,
	currentUser: {},
	userList: {}
};

export default (state = initalState, action = {}) => {
	switch (action.type) {
		case USER_LOGGED_IN:
			return { ...state, loaded:true, currentUser: action.user };

		case CURRENT_USER_FETCHED:
			return { ...state, loaded:true, currentUser: action.user };

		case USER_LOGGED_OUT:
			return { currentUser: {}, loaded:true, userList: {} };



		case USERS_FETCHED:
			return { ...state, userList: action.users };

		case USER_UPDATED:
			let updated = { ...state };
			updated['userList'][action.user._id] = action.user;
			return updated;

		case USER_DELETED:
			let updatedList = { ...state };
			updatedList.userList.filter(user => user._id === action.id);
			return updated;
		default:
			return state;
	}
};

import { userLoggedIn } from './auth';
import { USERS_FETCHED, USER_UPDATED, USER_DELETED } from '../constants';
import api from '../api';

export const signup = data => dispatch =>
	api.user.signup(data).then(user => {
		localStorage.telcoTechnicianJWT = user.token;
		dispatch(userLoggedIn(user));
	});

//TODO this is a admin only path
export const fetchAllUsers = () => dispatch =>
	api.user.fetchAll().then(users => dispatch(usersFetched(users)));

export const usersFetched = users => ({
	type: USERS_FETCHED,
	users
});

//TODO this is a admin only path
export const updateUser = (id, args) => dispatch =>
	api.user.update(id, args).then(user => dispatch(userUpdated(user)));

export const userUpdated = user => ({
	type: USER_UPDATED,
	user
});
//TODO this is a admin only path
export const deleteUser = id => dispatch =>
	api.user.delete().then(id => dispatch(userDeleted(id)));

export const userDeleted = id => ({
	type: USER_DELETED,
	id
});

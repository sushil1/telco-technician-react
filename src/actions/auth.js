import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants';
import api from '../api';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const userLoggedIn = user => ({ type: USER_LOGGED_IN, user });

export const login = credentials => dispatch =>
	api.user.login(credentials).then(user => {
		localStorage.telcoTechnicianJWT = user.token;
		setAuthorizationHeader(user.token);
		dispatch(userLoggedIn(user));
	});

export const userLoggedOut = () => ({ type: USER_LOGGED_OUT });

export const logout = () => dispatch => {
	localStorage.removeItem('telcoTechnicianJWT');
	dispatch(userLoggedOut());
	setAuthorizationHeader(null);
};

export const confirm = token => dispatch =>
	api.user.confirm(token).then(user => {
		localStorage.telcoTechnicianJWT = user.token;
		setAuthorizationHeader(user.token);
		dispatch(userLoggedIn(user));
	});

export const resetPasswordRequest = ({ email }) => () =>
	api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);

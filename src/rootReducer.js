import { combineReducers } from 'redux';
import user from './reducers/user';
import service from './reducers/service';
import booking from './reducers/booking';
import quote from './reducers/quote';
import ticket from './reducers/ticket';

export default combineReducers({
	user,
	service,
	booking,
	quote,
	ticket
});

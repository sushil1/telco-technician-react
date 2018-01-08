import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import decode from 'jwt-decode';
import { userLoggedIn } from './actions/auth';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

//todo decode email from local storage

if (localStorage.telcoTechnicianJWT) {
	const payload = decode(localStorage.telcoTechnicianJWT);

	const user = {
		email: payload.email,
		confirmed: payload.confirmed,
		token: localStorage.telcoTechnicianJWT,
		role: payload.role
	};

	setAuthorizationHeader(localStorage.telcoTechnicianJWT);

	store.dispatch(userLoggedIn(user));
} else {
	setAuthorizationHeader(null);
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();

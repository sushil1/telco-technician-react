import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { currentUserFetched, fetchCurrentUser } from './actions/users';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';



const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

//todo decode email from local storage

if (localStorage.telcoTechnicianJWT) {
	setAuthorizationHeader(localStorage.telcoTechnicianJWT);
	store.dispatch(fetchCurrentUser());
} else {
	store.dispatch(currentUserFetched({}))
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

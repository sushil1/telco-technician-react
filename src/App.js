import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserRoute, GuestRoute } from './components/routes';

import {
	HomePage,
	LoginPage,
	SignupPage,
	QuotePage,
	DashboardPage
} from './components/pages';
import { TopNavigation } from './components/navigation';

const App = ({ location }) => (
	<div className="ui container">
		<TopNavigation location={location} />
		<Route path="/" exact component={HomePage} location={location} />
		<Route path="/quote" exact component={QuotePage} location={location} />

		<UserRoute
			path="/dashboard"
			exact
			component={DashboardPage}
			location={location}
		/>
		<GuestRoute
			path="/signup"
			exact
			component={SignupPage}
			location={location}
		/>
		<GuestRoute path="/login" exact component={LoginPage} location={location} />
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default App;

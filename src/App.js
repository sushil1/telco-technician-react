import React from 'react';
import { Route } from 'react-router-dom';

import { HomePage, LoginPage, SignupPage, QuotePage } from './components/pages';
import { TopNavigation } from './components/navigation';

const App = () => (
	<div className="ui container">
		<TopNavigation />
		<Route path="/" exact component={HomePage} />
		<Route path="/book/quote" exact component={QuotePage} />
		<Route path="/login" exact component={LoginPage} />
		<Route path="/signup" exact component={SignupPage} />
	</div>
);

export default App;

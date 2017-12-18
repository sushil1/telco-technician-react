import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from './components/pages';
import { TopNavigation } from './components/navigation';

const App = () => (
	<div className="ui container">
		<TopNavigation />
		<Route path="/" exact component={HomePage} />
	</div>
);

export default App;

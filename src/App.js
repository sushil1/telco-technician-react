import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserRoute, GuestRoute } from './components/routes';
import { Grid, Button } from 'semantic-ui-react';

import {
	HomePage,
	LoginPage,
	SignupPage,
	QuotePage,
	DashboardPage,
	ConfirmationPage,
	ForgotPasswordPage,
	ResetPasswordPage,
	ServicesPage,
	FaqPage,
	ShowServicePage,
	ServiceBookingPage
} from './components/pages';
import {
	TopNavigation,
	Footer,
	SidebarNavigation
} from './components/navigation';

class App extends React.Component {
	render() {
		const { location } = this.props;

		return (
			<div>
				<Button
					inverted
					circular
					link="true"
					icon="arrow circle up"
					compact
					color="green"
					as="icon"
					onClick={() => window.scroll(0, 0)}
					style={{
						position: 'fixed',
						bottom: '20px',
						right: '20px',
						zIndex: '1',
						opacity: '0.5',
						margin: 'auto'
					}}
				/>
				<div style={{ minHeight: '100vh' }}>
					<Grid>
						<Grid.Row only="tablet" style={{ paddingBottom: '0' }}>
							<Grid.Column width={16}>
								<SidebarNavigation location={location} />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row only="computer" style={{ paddingBottom: '0' }}>
							<Grid.Column width={16}>
								<TopNavigation location={location} />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row only="mobile" style={{ paddingBottom: '0' }}>
							<Grid.Column width={16}>
								<SidebarNavigation location={location} />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{ paddingBottom: '0', paddingTop: '0' }}>
							<div
								className="ui teal top attached progress active"
								data-percent="8">
								<div
									className="bar"
									style={{ transitionDuration: '300ms', width: '55%' }}
								/>
							</div>
						</Grid.Row>

						<Route path="/" exact component={HomePage} location={location} />

						<Route
							path="/quote"
							exact
							component={QuotePage}
							location={location}
						/>

						<Route
							path="/book"
							exact
							component={ServiceBookingPage}
							location={location}
						/>
						<Route
							path={`/book/:_id`}
							render={props => (
								<ServiceBookingPage {...props} location={location} />
							)}
						/>

						<Route
							location={location}
							path="/confirmation/:token"
							exact
							component={ConfirmationPage}
						/>

						<Route
							location={location}
							path="/services"
							exact
							component={ServicesPage}
						/>

						<Route
							location={location}
							path="/services/:_id"
							component={ShowServicePage}
						/>

						<Route location={location} path="/faq" exact component={FaqPage} />

						<UserRoute
							path="/dashboard"
							component={DashboardPage}
							location={location}
						/>

						<GuestRoute
							path="/forgot_password"
							exact
							component={ForgotPasswordPage}
							location={location}
						/>

						<GuestRoute
							path="/reset_password/:token"
							exact
							component={ResetPasswordPage}
							location={location}
						/>

						<GuestRoute
							path="/signup"
							exact
							component={SignupPage}
							location={location}
						/>

						<GuestRoute
							path="/login"
							exact
							component={LoginPage}
							location={location}
						/>
					</Grid>
				</div>

				<Footer />
			</div>
		);
	}
}

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default App;

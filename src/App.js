import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserRoute, GuestRoute } from './components/routes';
import { Grid, Button } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {fetchCurrentUser} from './actions/users'
import Loader from 'react-loader'
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

	componentDidMount(){
		if(this.props.isAuthenticated)this.props.fetchCurrentUser()
	}


	render() {
		const { location, isAuthenticated, loaded } = this.props;

		return (
			<div>
				<Loader loaded={loaded}>
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
								<SidebarNavigation isAuthenticated={isAuthenticated} location={location} />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row only="computer" style={{ paddingBottom: '0' }}>
							<Grid.Column width={16}>
								<TopNavigation location={location} isAuthenticated={isAuthenticated}/>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row only="mobile" style={{ paddingBottom: '0' }}>
							<Grid.Column width={16}>
								<SidebarNavigation location={location} isAuthenticated={isAuthenticated}/>
							</Grid.Column>
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
							exact
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
				</Loader>
			</div>
		);
	}
}

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

function stateToProps(state){
	const currentUser = state.user.currentUser? state.user.currentUser.email : false
	return{
		isAuthenticated: !!currentUser,
		loaded:state.user.loaded
	}
}

export default connect(stateToProps, {fetchCurrentUser})(App);

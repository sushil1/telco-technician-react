import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Header } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class SidebarNavigation extends Component {
	state = { visible: false };

	toggleVisibility = () => this.setState({ visible: !this.state.visible });

	render() {
		const { visible } = this.state;
		const { isAuthenticated, logout } = this.props;
		return (
			<div>
				<Menu inverted attached="top">
					<Menu.Item as={NavLink} exact to="/">
						<Header inverted>
							Telco-Technician
						</Header>
					</Menu.Item>

					<Menu.Item position="right" onClick={() => this.toggleVisibility()}>
						{visible ? (
							<Icon name="remove" size="large"/>
						) : (
							<Icon name="tasks" size="large" />
						)}
					</Menu.Item>
				</Menu>

				<Sidebar
					as={Menu}
					animation="overlay"
					width="thin"
					visible={visible}
					icon="labeled"
					vertical
					inverted>
					<Menu.Item
						as={NavLink}
						exact
						to="/"
						onClick={() => this.toggleVisibility()}>
						Home
					</Menu.Item>
					<Menu.Item
						as={NavLink}
						to="/services"
						onClick={() => this.toggleVisibility()}>
						Services
					</Menu.Item>
					{isAuthenticated && (
						<Menu.Item
							as={NavLink}
							to="/dashboard"
							onClick={() => this.toggleVisibility()}>
							Dashboard
						</Menu.Item>
					)}
					<Menu.Item
						as={NavLink}
						to="/book"
						onClick={() => this.toggleVisibility()}>
						Book Us
					</Menu.Item>
					<Menu.Item
						as={NavLink}
						to="/quote"
						onClick={() => this.toggleVisibility()}>
						Quick Quote
					</Menu.Item>
					
					{isAuthenticated && (
						<Menu.Item
							as={Link}
							to="/"
							onClick={() => {
								logout();
								this.toggleVisibility();
							}}>
							Log Out
						</Menu.Item>
					)}

					{!isAuthenticated && (
						<Menu.Item
							as={NavLink}
							to="/login"
							onClick={() => this.toggleVisibility()}>
							Login
						</Menu.Item>
					)}
					{!isAuthenticated && (
						<Menu.Item
							as={NavLink}
							to="/signup"
							onClick={() => this.toggleVisibility()}>
							Sign Up
						</Menu.Item>
					)}
				</Sidebar>
			</div>
		);
	}
}


export default connect(null, { logout })(SidebarNavigation);

import React from 'react';
import { Menu, Dropdown, Image, Popup, Header, Grid } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const showGravatar = currentUser => {
  if (currentUser.confirmed) {
    return currentUser.email;
  }
  return 'jpt@gmail.com';
};

class TopNavigation extends React.Component {
  render() {
    const { isAuthenticated, logout, currentUser, serviceOptions } = this.props;
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <Menu.Item as={NavLink} exact to="/">
            <Header inverted>Telco Technician</Header>
          </Menu.Item>

          {isAuthenticated && (
            <Menu.Item as={NavLink} exact to="/dashboard">
              Dashboard
            </Menu.Item>
          )}

          <Popup trigger={<Menu.Item>Services</Menu.Item>} flowing hoverable>
            <Grid centered divided columns={6}>
              {serviceOptions.map(item => (
                <Grid.Column
                  column={2}
                  key={item.key}
                  as={Link}
                  to={`/services/${item.key}`}
                >
                  <strong style={{ color: 'black' }}>{item.text}</strong>
                </Grid.Column>
              ))}
            </Grid>
          </Popup>

          <Menu.Item as={NavLink} exact to="/book">
            Book Us
          </Menu.Item>
          <Menu.Item as={NavLink} exact to="/quote">
            Quick Quote
          </Menu.Item>

          <Menu.Item as={NavLink} to="/tracker">
            Track Your Booking
          </Menu.Item>

          {isAuthenticated ? (
            <Menu.Menu position="right">
              <Dropdown
                trigger={
                  <Image
                    avatar
                    style={{ marginTop: '10px', marginRight: '30px' }}
                  >
                    {
                      <Gravatar
                        email={showGravatar(currentUser)}
                        default="mm"
                      />
                    }
                  </Image>
                }
              >
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/" onClick={() => logout()}>
                    Logout
                  </Dropdown.Item>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right" style={{ marginRight: '30px' }}>
              <Menu.Item as={NavLink} exact to="/login">
                Login
              </Menu.Item>
              <Menu.Item as={NavLink} exact to="/signup">
                Signup
              </Menu.Item>
            </Menu.Menu>
          )}
        </div>
      </div>
    );
  }
}

function stateToProps(state) {
  const user = state.user;
  return {
    currentUser: user.currentUser
  };
}

TopNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    confirmed: PropTypes.bool
  }).isRequired
};

TopNavigation.defaultProps = {
  currentUser: {}
};

export default connect(stateToProps, { logout: actions.logout })(TopNavigation);

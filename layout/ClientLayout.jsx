import React, { Component } from 'react';
import { connect } from 'react-redux';

import CLientFooter from './ClientFooter';
import ClientHeader from './ClientHeader';
import './client.css';

import Api from '../api';

class ClientLayout extends Component {
  signOut = () => {
    const { dispatch, logoutToken } = this.props;
    Api.post(`/user/logout?logout_token=${logoutToken}`);
    dispatch({ type: 'LOGOUT' });
  };

  login = () => {};

  render() {
    const { children, token } = this.props;
    return (
      <div className="app client-layout">
        <ClientHeader
          signOut={this.signOut}
          login={this.login}
          isAuthentcated={Boolean(token)}
        />
        <div className="flex-page-content">
          <main className={token ? ' user-loggedin' : ''}>{children}</main>
        </div>
        <CLientFooter isAuthentcated={Boolean(token)} />
      </div>
    );
  }
}

const mapStateToProps = ({ token, logoutToken }) => ({ token, logoutToken });
export default connect(mapStateToProps)(ClientLayout);

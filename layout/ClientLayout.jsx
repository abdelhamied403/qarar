import React, { Component } from 'react';
import { connect } from 'react-redux';
import CLientFooter from './ClientFooter';
import ClientHeader from './ClientHeader';
import './client.css';
import Api from '../api';

class ClientLayout extends Component {
  componentDidMount() {
    this.login();
  }

  signOut = async () => {
    const { dispatch, logoutToken } = this.props;
    await Api.post(`/user/logout?logout_token=${logoutToken}`);
    dispatch({ type: 'LOGOUT' });
    window.location.href = 'https://apps.balady.gov.sa/UsersMgmt/logout';
  };

  login = async () => {
    const { loggedIn, dispatch } = this.props;
    let { postMessage } = window.parent;
    if (window.ReactNativeWebView) {
      postMessage = window.ReactNativeWebView.postMessage;
    }
    if (loggedIn && loggedIn.type) {
      setTimeout(() => {
        dispatch(loggedIn);
        postMessage(JSON.stringify(loggedIn));
      }, 500);
    }
  };

  render() {
    const { children, accessToken } = this.props;
    return (
      <div className="app client-layout">
        <ClientHeader
          signOut={this.signOut}
          login={this.login}
          isAuthentcated={Boolean(accessToken)}
        />
        <div className="flex-page-content">
          <main className={accessToken ? ' user-loggedin' : ''}>
            {children}
          </main>
        </div>
        <CLientFooter isAuthentcated={Boolean(accessToken)} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { accessToken, logoutToken } }) => ({
  accessToken,
  logoutToken
});
export default connect(mapStateToProps)(ClientLayout);

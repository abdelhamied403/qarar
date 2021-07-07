import React, { Component } from 'react';
import { connect } from 'react-redux';
import CLientFooter from './ClientFooter';
import ClientHeader from './ClientHeader';
import './client.css';
import Api from '../api';
import axios from 'axios';
import Page404 from '../views/Pages/Page404/Page404';
import { Spinner } from 'reactstrap';

class ClientLayout extends Component {
  state = {
    lang: 'ar',
    redirect: null
  };

  async getLang() {
    let token = JSON.parse(JSON.parse(localStorage['persist:primary']).auth)
      .accessToken;
    return await axios.get(
      'https://qarar-backend.sharedt.com/qarar_api/hide-lang',
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  componentDidMount() {
    this.login();
    localStorage.setItem('LANG', 'ar');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    this.getLang().then(res => {
      const isUser = res.data;
      if (params.lang === 'en' && isUser) {
        this.setState({ redirect: false });
      } else {
        this.setState({ redirect: true });
      }
    });
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
      dispatch(loggedIn);
      postMessage(JSON.stringify(loggedIn));
    }
  };

  render() {
    const { children, accessToken } = this.props;
    if (this.state.redirect === true) {
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
    } else if (this.state.redirect === false) {
      return 'page not found';
    } else {
      return (
        <div className="loading">
          <div className="spinner">
            <div className="spin">
              <Spinner color="primary" />
            </div>
            <div>loading</div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth: { accessToken, logoutToken } }) => ({
  accessToken,
  logoutToken
});
export default connect(mapStateToProps)(ClientLayout);

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

  signOut = () => {
    const { dispatch, logoutToken } = this.props;
    Api.post(`/user/logout?logout_token=${logoutToken}`);
    dispatch({ type: 'LOGOUT' });
  };

  login = async () => {
    const { cookies, dispatch } = this.props;

    console.log('cookie', cookies);
    if (cookies && cookies.hasOwnProperty('.ASPXFORMSAUTH')) {
      const response = await Api.post('/qarar_api/balady-login?_format=json', {
        cookie: cookies['.ASPXFORMSAUTH']
      });
      console.log(response);
      if (response.ok) {
        const response2 = await Api.get(
          `/qarar_api/load/user/current?_format=json`,
          {},
          { headers: { Autorization: `Bearer ${response.data.token}` } }
        );
        console.log(response2);
        if (response2.ok) {
          dispatch({
            type: 'LOGIN',
            profileImage: response2.data.picture,
            uid: response2.data.id,
            name: response2.data.name,
            accessToken: response.data.token
          });
        }
      }
    }
  };

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

const mapStateToProps = ({ auth: { token, logoutToken } }) => ({
  token,
  logoutToken
});
export default connect(mapStateToProps)(ClientLayout);

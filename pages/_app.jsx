import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import withAnalytics from 'next-analytics';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { parseCookies } from 'nookies';
import withReduxStore from '../redux/with-redux-store';
import ClientLayout from '../layout';
import Loading from '../components/loading';
import Api from '../api';
import 'simple-line-icons/css/simple-line-icons.css';
import 'flag-icon-css/css/flag-icon.min.css';
import './main.css';
import './qarar.css';

class MyApp extends App {
  static async getInitialProps(ctx) {
    const store = ctx.ctx.reduxStore;
    const { dispatch } = store;
    const cookies = parseCookies(ctx);
    console.log(cookies, cookies.hasOwnProperty('.ASPXFORMSAUTH'));
    if (cookies && cookies.hasOwnProperty('.ASPXFORMSAUTH')) {
      console.log(cookies['.ASPXFORMSAUTH']);
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
  }

  constructor(props) {
    super(props);
    this.state = { cookies: props.cookies };
    this.persistor = persistStore(props.reduxStore);
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={<Loading />} persistor={this.persistor}>
          <>
            <Head>
              <link
                rel="icon"
                type="image/png"
                href="/static/fav.ico"
                importance="low"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Changa:200,300,400,500,600,700,800&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                rel="stylesheet"
                integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                crossOrigin="anonymous"
              />
              <link
                rel="stylesheet"
                href="https://unpkg.com/@coreui/icons/css/free.min.css"
              />
            </Head>
            <ClientLayout>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </ClientLayout>
          </>
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxStore(
  withAnalytics(Router, {
    ga: 'UA-150975722-5'
  })(MyApp)
);

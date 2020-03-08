import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import withReduxStore from '../redux/with-redux-store';
import ClientLayout from '../layout';
import Loading from '../components/loading';

import 'simple-line-icons/css/simple-line-icons.css';
import 'flag-icon-css/css/flag-icon.min.css';
import './main.css';
import './qarar.css';

class MyApp extends App {
  constructor(props) {
    super(props);
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

export default withReduxStore(MyApp);

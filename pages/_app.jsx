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
                rel="apple-touch-icon"
                sizes="57x57"
                href="/static/apple-icon-57x57.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="/static/apple-icon-60x60.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="72x72"
                href="/static/apple-icon-72x72.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="76x76"
                href="/static/apple-icon-76x76.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="/static/apple-icon-114x114.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="120x120"
                href="/static/apple-icon-120x120.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="/static/apple-icon-144x144.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="152x152"
                href="/static/apple-icon-152x152.png"
                importance="low"
              />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/static/apple-icon-180x180.png"
                importance="low"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/static/android-icon-192x192.png"
                importance="low"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/favicon-32x32.png"
                importance="low"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href="/static/favicon-96x96.png"
                importance="low"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/favicon-16x16.png"
                importance="low"
              />
              <link
                rel="manifest"
                href="/static/manifest.json"
                importance="low"
              />
              <meta name="msapplication-TileColor" content="#ffffff" />
              <meta
                name="msapplication-TileImage"
                content="/static/ms-icon-144x144.png"
              />
              <meta name="theme-color" content="#ffffff" />
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

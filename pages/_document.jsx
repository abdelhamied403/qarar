import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html dir="rtl" lang="ar">
        <Head />

        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}

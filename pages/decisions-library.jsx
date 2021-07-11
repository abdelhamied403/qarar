import React from 'react';
import Head from 'next/head';
import DecisionsLibraryPage from '../views/Pages/decisions-library/decisions-library';

const DecisionsLibrary = () => (
  <div>
    <Head>
      <title>مكتبة القرارات - قرار - وزارة الشؤون البلدية والقروية</title>
    </Head>
    <DecisionsLibraryPage />
  </div>
);

export default DecisionsLibrary;

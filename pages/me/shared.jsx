import React from 'react';
import Head from 'next/head';
import SharedPage from '../../views/Pages/shared/shared';
import Auth from '../../layout/auth';

const Shared = () => (
  <Auth>
    <div>
      <Head>
        <title>مشاركاتي - قرار - وزارة العمل</title>
      </Head>
      <SharedPage />
    </div>
  </Auth>
);

export default Shared;

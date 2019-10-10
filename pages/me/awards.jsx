import React from 'react';
import Head from 'next/head';
import AwardsPage from '../../views/Pages/award/award';
import Auth from '../../layout/auth';

const Awards = () => (
  <Auth>
    <div>
      <Head>
        <title>أوسمتي - قرار - وزارة العمل</title>
      </Head>
      <AwardsPage />
    </div>
  </Auth>
);

export default Awards;

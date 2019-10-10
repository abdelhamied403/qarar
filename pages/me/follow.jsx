import React from 'react';
import Head from 'next/head';
import FollowPage from '../../views/Pages/follow/follow';
import Auth from '../../layout/auth';

const Follow = () => (
  <Auth>
    <div>
      <Head>
        <title>متابعاتي - قرار - وزارة العمل</title>
      </Head>
      <FollowPage />
    </div>
  </Auth>
);

export default Follow;

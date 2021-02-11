import React from 'react';
import Head from 'next/head';
import GroupsPage from '../../views/Pages/groups/groups';
import Auth from '../../layout/auth';

const Groups = () => (
  <Auth>
    <div>
      <Head>
        <title>مجموعاتي - قرار - وزارة الشؤون البلدية والقروية</title>
      </Head>
      <GroupsPage />
    </div>
  </Auth>
);

export default Groups;

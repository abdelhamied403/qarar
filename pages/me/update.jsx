import React from 'react';
import Head from 'next/head';
import UpdatePage from '../../views/Pages/about-update/about-update';
import Auth from '../../layout/auth';

const Update = () => (
  <Auth>
    <div>
      <Head>
        <title>تعديل بيانات المستخدم - قرار- وزارة العمل</title>
      </Head>
      <UpdatePage />
    </div>
  </Auth>
);

export default Update;

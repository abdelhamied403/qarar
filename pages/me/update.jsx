import React from 'react';
import Head from 'next/head';
import UpdatePage from '../../views/Pages/about-update/about-update';
import Auth from '../../layout/auth';

const Update = () => (
  <Auth>
    <div>
      <Head>
        <title>
          تعديل بيانات المستخدم - قرار- وزارة الشؤون البلدية والقروية
        </title>
        <link href="/static/css/about-update.css" rel="stylesheet" />
      </Head>
      <UpdatePage />
    </div>
  </Auth>
);

export default Update;

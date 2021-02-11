import React from 'react';
import Head from 'next/head';
import NotificationsPage from '../../views/Pages/notifications/notifications';
import Auth from '../../layout/auth';

const Notifications = () => (
  <Auth>
    <div>
      <Head>
        <title>إشعاراتي - قرار - وزارة الشؤون البلدية والقروية</title>
      </Head>
      <NotificationsPage />
    </div>
  </Auth>
);

export default Notifications;

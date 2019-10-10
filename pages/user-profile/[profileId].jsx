import React from 'react';
import Head from 'next/head';
import ProfilePage from '../../views/Pages/user-info/user-info';

const Profile = () => (
  <div>
    <div>
      <Head>
        <title>الصفحة الشخصية - قرار- وزارة العمل</title>
      </Head>
      <ProfilePage />
    </div>
  </div>
);

export default Profile;
